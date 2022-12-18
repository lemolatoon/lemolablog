alter table public.blogs
add constraint only_me
check
(
  id = 'your uuid'
);

alter table public.profiles
add constraint only_me
check
(
  id = 'your uuid'
);
