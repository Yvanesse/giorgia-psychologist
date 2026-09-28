create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'Psicologia',
  excerpt text not null default '',
  content text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('in-presenza', 'online')),
  appointment_date date not null,
  appointment_time time not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled', 'completed')),
  google_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists appointment_requests_set_updated_at on public.appointment_requests;
create trigger appointment_requests_set_updated_at
before update on public.appointment_requests
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.articles enable row level security;
alter table public.appointment_requests enable row level security;

drop policy if exists "admin can read own membership" on public.admin_users;
create policy "admin can read own membership"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "public can read published articles" on public.articles;
create policy "public can read published articles"
on public.articles
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "admins can manage articles" on public.articles;
create policy "admins can manage articles"
on public.articles
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "admins can manage appointment requests" on public.appointment_requests;
create policy "admins can manage appointment requests"
on public.appointment_requests
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);

create index if not exists appointment_requests_date_time_idx
  on public.appointment_requests (appointment_date, appointment_time);

create index if not exists appointment_requests_status_idx
  on public.appointment_requests (status, created_at desc);
