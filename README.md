# Aegis Password Manager

Aegis is a local-first password manager prototype. This repository contains a React web vault, a self-hosted account and sync API, and documentation for future native apps and browser extensions.

## What is in this repository

| Area | Implementation |
| --- | --- |
| [Web vault](apps/web/src/main.jsx) | Vault creation and unlock, login records, search, and password generation |
| [Vault storage](apps/web/src/vaultCrypto.js) | Browser-side encryption and IndexedDB persistence, with support for encrypted sync envelopes |
| [API](server/README.md) | Account and session endpoints backed by PostgreSQL, with server-side storage for encrypted vault data |
| [Platform targets](docs/FEATURES.md) | Web, Android, iOS, desktop, browser extension, and CLI roadmap |

## Run the web app locally

Install Node.js and npm, then run these commands from the repository root.

```sh
cd apps/web
npm install
npm run dev
```

Open the URL printed by Vite. Use sample entries to try the vault creation, lock and unlock, search, and password generator. Run `npm run build` to create a web build.

## Run the optional backend

The backend uses PostgreSQL and can be run with [Docker Compose](docker-compose.yml). See [server setup](server/README.md) for environment and HTTPS configuration, and [the database guide](docs/DATABASE.md) for the storage model. Production email delivery for verification and password resets still requires integration.

## Security and project status

Aegis is under active development. Use test data while trying the prototype. An independent security audit is pending. The [security policy](SECURITY.md) covers reporting and release gates, and the [threat model](docs/THREAT_MODEL.md) describes the intended client-side encryption boundary.
