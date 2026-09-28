import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, isAdmin: false };
  }

  const { data: membership } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { supabase, user, isAdmin: Boolean(membership) };
}

function extensionFor(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export async function POST(request: Request) {
  try {
    const { supabase, isAdmin } = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Seleziona un’immagine." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { message: "Formato non supportato. Usa JPG, PNG o WEBP." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "L’immagine è troppo grande. Dimensione massima: 5 MB." },
        { status: 400 },
      );
    }

    const path = `covers/${crypto.randomUUID()}.${extensionFor(file.type)}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, bytes, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("article-images").getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl });
  } catch {
    return NextResponse.json(
      { message: "Non è stato possibile caricare l’immagine." },
      { status: 500 },
    );
  }
}
