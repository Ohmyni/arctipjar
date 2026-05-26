create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  display_name text not null,
  recipient_wallet text not null,
  bio text,
  social_link text,
  created_at timestamptz default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_username_format'
  ) then
    alter table public.profiles
      add constraint profiles_username_format
      check (username ~ '^[a-z0-9-]+$');
  end if;
end
$$;

alter table public.profiles
  enable row level security;

drop policy if exists "profiles are publicly readable" on public.profiles;
create policy "profiles are publicly readable"
  on public.profiles
  for select
  using (true);

drop policy if exists "profiles are publicly insertable for mvp" on public.profiles;
create policy "profiles are publicly insertable for mvp"
  on public.profiles
  for insert
  with check (true);
