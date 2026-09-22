import { NextResponse } from "next/server";

import {
  BOOKING_TIME_ZONE,
  bookingSlotRange,
  bookingSlotToDate,
  getBookingSlots,
  isAllowedBookingDate,
} from "@/lib/booking-schedule";
import {
  getBusyPeriods,
  isGoogleCalendarConfigured,
  overlapsBusyPeriod,
} from "@/lib/google-calendar";
import { createAdminClient } from "@/lib/supabase/admin";

function todayInRome() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(isoDate: string, amount: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount, 12));
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

export async function GET() {
  const slots = getBookingSlots();
  const firstDate = addDays(todayInRome(), 1);
  const lastDate = addDays(firstDate, 89);

  const calendarConfigured = isGoogleCalendarConfigured();

  try {
    const [busyPeriods, reservedResult] = await Promise.all([
      calendarConfigured
        ? getBusyPeriods(
            bookingSlotToDate(firstDate, "00:00").toISOString(),
            bookingSlotToDate(addDays(lastDate, 1), "00:00").toISOString(),
          )
        : Promise.resolve([]),
      (async () => {
        const supabase = createAdminClient();
        if (!supabase) return [] as Array<{ appointment_date: string; appointment_time: string; status: string }>;

        const { data, error } = await supabase
          .from("appointment_requests")
          .select("appointment_date, appointment_time, status")
          .gte("appointment_date", firstDate)
          .lte("appointment_date", lastDate)
          .in("status", ["new", "confirmed"]);

        if (error) throw error;
        return data ?? [];
      })(),
    ]);

    const reserved = new Set(
      reservedResult.map(
        (item) => `${item.appointment_date}T${String(item.appointment_time).slice(0, 5)}`,
      ),
    );

    const dates: Array<{ date: string; availableSlots: string[] }> = [];

    for (let offset = 0; offset < 90; offset += 1) {
      const date = addDays(firstDate, offset);
      if (!isAllowedBookingDate(date)) continue;

      const availableSlots = slots.filter((time) => {
        if (reserved.has(`${date}T${time}`)) return false;

        if (!calendarConfigured) return true;

        const { start, end } = bookingSlotRange(date, time);
        return !overlapsBusyPeriod(start, end, busyPeriods);
      });

      dates.push({ date, availableSlots });
    }

    return NextResponse.json({
      calendarConfigured,
      timeZone: BOOKING_TIME_ZONE,
      durationMinutes: Number(process.env.BOOKING_DURATION_MINUTES ?? "60") || 60,
      slots,
      dates,
    });
  } catch {
    return NextResponse.json(
      { message: "Non è stato possibile leggere le disponibilità." },
      { status: 503 },
    );
  }
}
