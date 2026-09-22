import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

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

export async function GET() {
  try {
    const { supabase, isAdmin } = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, category, excerpt, content, status, published_at, created_at, updated_at")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ items: data ?? [] });
  } catch {
    return NextResponse.json({ message: "Database non ancora disponibile." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user, isAdmin } = await requireAdmin();

    if (!isAdmin || !user) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const input = (await request.json()) as {
      title?: string;
      category?: string;
      excerpt?: string;
      content?: string;
      status?: "draft" | "published";
    };

    const title = typeof input.title === "string" ? input.title.trim() : "";
    const category = typeof input.category === "string" ? input.category.trim() : "";
    const excerpt = typeof input.excerpt === "string" ? input.excerpt.trim() : "";
    const content = typeof input.content === "string" ? input.content.trim() : "";
    const status = input.status === "published" ? "published" : "draft";

    if (!title) {
      return NextResponse.json({ message: "Inserisci un titolo." }, { status: 400 });
    }

    const baseSlug = slugify(title) || "articolo";
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("articles")
      .insert({
        slug,
        title,
        category: category || "Psicologia",
        excerpt,
        content,
        status,
        author_id: user.id,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select("id, slug, title, category, excerpt, content, status, published_at, created_at, updated_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ item: data }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Non è stato possibile salvare l’articolo." }, { status: 503 });
  }
}
