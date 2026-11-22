<h1 align="center">🔐 Aegis Password Manager</h1>

<p align="center"><strong>A local-first web vault and self-hosted sync prototype.</strong></p>

<p align="center">
  <img alt="React" src="https://img.shields.io/static/v1?label=&amp;message=React&amp;color=4338CA&amp;style=for-the-badge">
  <img alt="Vite" src="https://img.shields.io/static/v1?label=&amp;message=Vite&amp;color=0F766E&amp;style=for-the-badge">
  <img alt="PostgreSQL" src="https://img.shields.io/static/v1?label=&amp;message=PostgreSQL&amp;color=475569&amp;style=for-the-badge">
</p>

<p align="center">
  <a href="#what-is-in-this-repository">What is in this repository</a> · <a href="#run-the-web-app-locally">Run the web app locally</a> · <a href="#run-the-optional-backend">Run the optional backend</a> · <a href="#security-and-project-status">Security and project status</a>
</p>

---


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
