# Database service: Supabase + PostgreSQL

Aegis uses Supabase as the cloud control plane: PostgreSQL for encrypted sync records, Auth for account sessions, Storage for client-encrypted attachments, and Realtime where useful for sync notifications.

## Zero-knowledge boundary
The database MUST NOT receive plaintext vault item contents, passwords, TOTP seeds, recovery codes, private keys, decrypted attachments, the master password, or unwrapped vault/item keys.

Clients encrypt before upload and decrypt after download. Server-side rows contain ciphertext envelopes plus the minimum routing/version metadata required for sync.

## Core tables
- profiles: non-secret account preferences
- vaults: vault ownership and encrypted vault-key envelope
- vault_members: family/team access and wrapped member keys
- vault_items: encrypted item envelopes and sync version
- item_versions: encrypted history
- devices: trusted-device public metadata and wrapped device key material
- shares: encrypted sharing envelopes, expiry and revocation state
- security_events: minimal security/audit events with no secret values
- recovery_methods: encrypted recovery envelopes
- sync_cursors: per-device sync state

Attachments are encrypted locally before Supabase Storage upload. Object paths use opaque IDs.

## Authorization
Every exposed table uses Row Level Security. Policies must check actual ownership/membership, not merely the authenticated role. Update policies use both USING and WITH CHECK. The frontend uses only a publishable key; service-role/secret keys never ship to clients.

## Production gate
Do not call the product production-secure until the cryptographic protocol, recovery design, native keystore integrations, extension boundary, and sync conflict behavior have independent security review.
