alter table profiles add column if not exists username text;
alter table profiles add column if not exists locale text;
alter table profiles add column if not exists timezone text;
alter table profiles add column if not exists bio text;
create unique index if not exists profiles_username_unique on profiles(lower(username)) where username is not null;
