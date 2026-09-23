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

function safe(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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

const articleSelect =
  "id, slug, title, category, excerpt, content, status, published_at, created_at, updated_at";

export async function GET() {
  try {
    const { supabase, isAdmin } = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
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

    const title = safe(input.title);
    const category = safe(input.category) || "Psicologia";
    const excerpt = safe(input.excerpt);
    const content = safe(input.content);
    const status = input.status === "published" ? "published" : "draft";

    if (!title) {
      return NextResponse.json({ message: "Inserisci un titolo." }, { status: 400 });
    }

    if (status === "published" && !content) {
      return NextResponse.json(
        { message: "Inserisci il testo dell’articolo prima di pubblicarlo." },
        { status: 400 },
      );
    }

    const baseSlug = slugify(title) || "articolo";
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("articles")
      .insert({
        slug,
        title,
        category,
        excerpt,
        content,
        status,
        author_id: user.id,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select(articleSelect)
      .single();

    if (error) throw error;

    return NextResponse.json({ item: data }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Non è stato possibile salvare l’articolo." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { supabase, isAdmin } = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const input = (await request.json()) as {
      id?: string;
      title?: string;
      category?: string;
      excerpt?: string;
      content?: string;
      status?: "draft" | "published";
    };

    const id = safe(input.id);
    if (!id) {
      return NextResponse.json({ message: "Articolo non valido." }, { status: 400 });
    }

    const { data: existing, error: existingError } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("id", id)
      .maybeSingle();

    if (existingError) throw existingError;
    if (!existing) {
      return NextResponse.json({ message: "Articolo non trovato." }, { status: 404 });
    }

    const title = input.title === undefined ? existing.title : safe(input.title);
    const category = input.category === undefined ? existing.category : safe(input.category) || "Psicologia";
    const excerpt = input.excerpt === undefined ? existing.excerpt : safe(input.excerpt);
    const content = input.content === undefined ? existing.content : safe(input.content);
    const status = input.status === undefined ? existing.status : input.status === "published" ? "published" : "draft";

    if (!title) {
      return NextResponse.json({ message: "Inserisci un titolo." }, { status: 400 });
    }

    if (status === "published" && !content) {
      return NextResponse.json(
        { message: "Inserisci il testo dell’articolo prima di pubblicarlo." },
        { status: 400 },
      );
    }

    const publishedAt =
      status === "published"
        ? existing.published_at || new Date().toISOString()
        : null;

    const { data, error } = await supabase
      .from("articles")
      .update({
        title,
        category,
        excerpt,
        content,
        status,
        published_at: publishedAt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(articleSelect)
      .single();

    if (error) throw error;

    return NextResponse.json({ item: data });
  } catch {
    return NextResponse.json({ message: "Non è stato possibile aggiornare l’articolo." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { supabase, isAdmin } = await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const input = (await request.json()) as { id?: string };
    const id = safe(input.id);

    if (!id) {
      return NextResponse.json({ message: "Articolo non valido." }, { status: 400 });
    }

    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Non è stato possibile eliminare l’articolo." }, { status: 503 });
  }
}
