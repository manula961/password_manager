# Aegis Password Manager — cross-platform foundation

A working first slice of a privacy-first password manager. The web prototype is dependency-free and runs locally; the repository layout reserves platform apps and a shared crypto core.

## Run the Web/PWA prototype

```bash
cd apps/web
python3 -m http.server 8080
# open http://localhost:8080
```

Implemented in this slice: responsive dashboard, unified navigation, vault search, add-login flow, local persistence, Web Crypto password generation, lock/privacy state, Security/Sharing/Activity/Settings surfaces, trusted-device and protection-score UI.

## Architecture direction

- `apps/web` — Web Vault / PWA
- `apps/android` — Android shell (Kotlin/Compose planned)
- `apps/desktop` — Windows/macOS/Linux shell (Tauri planned)
- `apps/browser-extension` — Chrome/Edge/Firefox/Safari extension
- `packages/crypto-core` — audited shared crypto boundary; no plaintext server processing
- `packages/shared` — shared models, sync protocol, validation

Security note: this prototype deliberately does **not** claim production-grade vault encryption yet. Production cryptography needs an audited design (Argon2id KDF, authenticated encryption, key hierarchy, secure platform keystores, memory/clipboard handling, recovery model, and threat-model review) before real secrets are entrusted to it.


## Database and sync service

The planned backend is **Supabase**: PostgreSQL + Auth + Storage + optional Realtime. Aegis remains zero-knowledge: clients encrypt vault data before sync; Supabase stores ciphertext, encrypted key envelopes, and minimal sync/account metadata. See `docs/DATABASE.md` and `supabase/schema.sql`.

## Full product scope

See `docs/FEATURES.md` for the complete vault, generator, autofill, security, privacy, device, sharing, recovery, identity, developer, and cross-platform feature map. iOS/iPadOS and CLI shells are included alongside Web, Android, desktop, and browser-extension targets.
