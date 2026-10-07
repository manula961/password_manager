alter table vault_sync_devices add column if not exists revoked_at timestamptz;
alter table vault_sync_devices add column if not exists label text;
alter table vault_sync_devices add column if not exists platform text;
create index if not exists vault_sync_devices_active_idx on vault_sync_devices(user_id,last_seen_at) where revoked_at is null;
