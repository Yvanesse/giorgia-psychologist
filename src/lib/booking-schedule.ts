export const BOOKING_TIME_ZONE = "Europe/Rome";

export function getBookingSlots() {
  const configured = (process.env.BOOKING_SLOTS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => /^\d{2}:\d{2}$/.test(value));

  return configured.length > 0 ? configured : ["09:00", "11:00", "15:00", "17:00"];
}

export function getBookingDurationMinutes() {
  const parsed = Number(process.env.BOOKING_DURATION_MINUTES ?? "60");
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 240 ? parsed : 60;
}

function timeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return asUtc - date.getTime();
}

export function bookingSlotToDate(date: string, time: string) {
  const guess = new Date(`${date}T${time}:00Z`);
  const firstOffset = timeZoneOffsetMs(guess, BOOKING_TIME_ZONE);
  let result = new Date(guess.getTime() - firstOffset);
  const secondOffset = timeZoneOffsetMs(result, BOOKING_TIME_ZONE);

  if (secondOffset !== firstOffset) {
    result = new Date(guess.getTime() - secondOffset);
  }

  return result;
}

export function bookingSlotRange(date: string, time: string) {
  const start = bookingSlotToDate(date, time);
  const end = new Date(start.getTime() + getBookingDurationMinutes() * 60_000);
  return { start, end };
}

export function isAllowedBookingDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const localNoon = new Date(`${date}T12:00:00`);
  if (Number.isNaN(localNoon.getTime())) return false;

  const weekday = localNoon.getDay();
  return weekday !== 0 && weekday !== 6;
}

export function isAllowedBookingTime(time: string) {
  return getBookingSlots().includes(time);
}
