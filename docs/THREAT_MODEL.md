# Aegis threat model

## Security boundary
Aegis clients encrypt vault secrets before synchronization. The Oracle API and PostgreSQL database are treated as untrusted for vault confidentiality. Account authentication and vault unlocking are separate security domains.

## Protected assets
Vault plaintext, vault keys, master passwords, TOTP seeds, recovery material, attachments, sharing keys, device credentials, and session tokens.

## Primary adversaries
A database reader; a compromised sync server; a network attacker; phishing sites; a stolen locked device; a malicious or stale authorized device; supply-chain compromise; and an attacker with an account password but not the vault master password.

## Current cryptographic construction
New browser vaults derive a KEK from the master password with Argon2id (64 MiB, 3 iterations, parallelism 1). A random 256-bit vault key is wrapped by that KEK. Vault payloads use AES-256-GCM. Synchronization transports an opaque envelope containing encrypted payload/key-wrapper material and non-secret revision metadata. Exact-base revision compare-and-swap prevents stale overwrites. Compatible client conflicts are decrypted and merged only on the client.

## Invariants
The server must never receive a master password or unwrapped vault key. A stale revision must not overwrite a newer revision. Automatic merge must stop across key-wrapper changes. Revoked devices must not advance the tombstone acknowledgement floor. New-device bootstrap must not create a vault while remote state is unknown. Master-password wrapper changes must become durable locally only after server acceptance.

## Known limitations requiring review
Browser JavaScript cannot guarantee memory zeroization. Item mutation ordering still uses wall-clock time with a random mutation tie-breaker rather than a full hybrid logical clock. The current vault uses one encrypted payload rather than independent per-item keys. Recovery, sharing, passkey custody, attachments, breach lookup and native-platform key stores are not yet part of the reviewed protocol. CSP/CSRF/session hardening and dependency pinning require completion. No external cryptographic audit has been completed.

## Audit gate
Do not market Aegis as audited or recommend storing high-value production secrets until the cryptographic protocol, client implementations, server authorization, recovery design and release artifacts have passed independent review and findings have been remediated.
