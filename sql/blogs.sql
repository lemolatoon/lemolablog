--- create a table for blogs for each users.
create table blogs (
  id uuid references auth.users not null,
  published_at timestamp with time zone,
  updated_at timestamp with time zone,
  post_id serial not null primary key,
  title text,
  raw_markdown text,
  converted_html text,
  is_public boolean,
  is_deleted boolean
);

-- Set up Row level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table blogs
  enable row level security;

create policy "blogs are viewwable by everyone if it's public." on blogs
  for select using (is_public and not is_deleted);

create policy "Users can insert their own profile." on blogs
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on blogs
  for update using (auth.uid() = id);

alter table public.blogs
add constraint only_me
check
(
  id = 'your uuid'
);