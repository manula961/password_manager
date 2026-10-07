alter table auth_sessions add column if not exists device_id uuid;
create index if not exists auth_sessions_user_device_idx on auth_sessions(user_id,device_id) where revoked_at is null;
