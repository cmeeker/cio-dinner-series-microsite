-- Workato CIO Dinner Series — registrations table
-- Run this in Supabase SQL Editor or via `supabase db push`

create table if not exists public.registrations (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  first_name   text not null,
  last_name    text not null,
  email        text not null,
  company      text not null,
  title        text not null,
  message      text,
  city_key     text not null,
  event_month  text not null
);

-- Indexes
create index if not exists registrations_city_key_idx on public.registrations (city_key);
create index if not exists registrations_email_idx     on public.registrations (email);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

-- Row Level Security — allow anon inserts, restrict reads to authenticated/service role
alter table public.registrations enable row level security;

create policy "Allow anonymous inserts" on public.registrations
  for insert to anon with check (true);

create policy "Authenticated users can read all" on public.registrations
  for select to authenticated using (true);
