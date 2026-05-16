-- Splitko profile table — keyed by auth.users(id).
-- Run in the Supabase SQL editor once after creating the project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  dob date,
  oib text,
  kvart text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles owner read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles owner upsert"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles owner update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
