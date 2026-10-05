# Aegis API

Self-hosted authentication and ciphertext storage service for the Oracle VM.

## Run

Copy `.env.example` to `.env`, set a strong database password in the root `.env`, set `TOKEN_PEPPER` to at least 32 random bytes, then run `docker compose up -d`. Put an HTTPS reverse proxy in front of `127.0.0.1:8080`.

Implemented account endpoints: signup, login, logout, current session, email verification, forgot-password token issuance, and password reset. Session and one-time tokens are stored only as SHA-256+pepper hashes. Passwords use Argon2id.

Production still needs an email delivery provider wired to verification/reset token creation. Development returns/logs tokens only outside production. The account password authenticates the account; vault encryption/unlock must remain client-side and separately derived.
