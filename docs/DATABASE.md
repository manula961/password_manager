# Database and hosting: Oracle Cloud VM + PostgreSQL

Aegis is designed to run on an Oracle Cloud Infrastructure (OCI) Linux VM with a self-hosted application stack. It does not depend on Supabase or another database-as-a-service provider.

## Deployment layout

Internet -> HTTPS reverse proxy -> Aegis API/sync service -> PostgreSQL

PostgreSQL is not exposed publicly. Only the HTTPS application endpoint should be internet-facing. Administrative SSH access should be key-based and tightly restricted.

## Zero-knowledge boundary

The server MUST NOT receive plaintext vault item contents, passwords, TOTP seeds, recovery codes, private keys, decrypted attachments, the master password, or unwrapped vault/item keys.

Clients encrypt before upload and decrypt after download. Server-side rows contain ciphertext envelopes plus the minimum routing/version metadata required for authentication, authorization and synchronization.

## Services

- Aegis API: authentication/session control, device management, encrypted sync, sharing and recovery coordination
- PostgreSQL: encrypted vault records and operational metadata
- encrypted attachment store: initially VM-backed persistent storage; object storage can be added later without changing vault cryptography
- reverse proxy: TLS termination, security headers and request limits
- backup job: encrypted database and attachment backups
- monitoring: service health, resource use and security events without logging vault secrets

## Core tables

- accounts: account identity and password-auth verifier/session metadata
- vaults: vault ownership and encrypted vault-key envelope
- vault_members: family/team access and wrapped member keys
- vault_items: encrypted item envelopes and sync version
- item_versions: encrypted history
- devices: trusted-device public metadata and wrapped device key material
- shares: encrypted sharing envelopes, expiry and revocation state
- security_events: minimal security/audit events with no secret values
- recovery_methods: encrypted recovery envelopes
- sync_cursors: per-device sync state

## Security rules

The API owns database authorization. Database credentials never ship to Web, Android, iOS, desktop, browser extensions or CLI clients. PostgreSQL listens only on a private/container network. Use least-privilege database roles, parameterized queries, TLS externally, rate limiting, short-lived sessions, CSRF protection where applicable, strict origin handling, encrypted backups and regular patching.

The account-authentication password flow must be cryptographically separated from the vault-unlock key derivation. The master password and derived vault keys never become server secrets.

## Production gate

Do not call the product production-secure until the cryptographic protocol, authentication protocol, recovery design, native keystore integrations, extension boundary, API authorization, deployment hardening, backup/restore procedure and sync conflict behavior have independent security review.
