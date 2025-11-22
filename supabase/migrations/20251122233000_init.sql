-- Create a table for storing generated menus
create table if not exists public.menus (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  ingredients jsonb not null,
  plating_guide jsonb not null,
  total_price numeric not null,
  chef_comment text not null,
  store text not null,
  style text not null,
  budget numeric not null
);

-- Enable Row Level Security (RLS)
alter table public.menus enable row level security;

-- Create a policy that allows anyone to read menus (public)
create policy "Enable read access for all users"
  on public.menus for select
  using (true);

-- Create a policy that allows inserting menus (public/anon for now, can be restricted later)
create policy "Enable insert access for all users"
  on public.menus for insert
  with check (true);
