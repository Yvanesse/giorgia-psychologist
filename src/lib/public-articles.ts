import { createClient } from "@/lib/supabase/server";

export type PublicArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
};

export function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

export async function getPublishedArticles(limit?: number): Promise<PublicArticle[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("articles")
      .select("id, slug, title, category, excerpt, content, cover_image_url, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw error;

    return data ?? [];
  } catch {
    return [];
  }
}

export async function getPublishedArticleBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, category, excerpt, content, cover_image_url, published_at")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return data ?? null;
  } catch {
    return null;
  }
}
