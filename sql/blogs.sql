--- create a table for blogs for each users.
create table blogs (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  post_id bigint,
  raw_markdown text,
  converted_html text,
  is_public boolean,
  is_deleted boolean
);

-- Set up Row level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table blogs
  enable row level security;

create policy "Users can insert their own blogs." on blogs
  for insert with check (auth.uid() = id);

create policy "Users can update own blogs." on blogs
  for update using (auth.uid() = id);