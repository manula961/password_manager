# Security policy

Aegis is under active security development and has not completed an independent security audit. Do not use the current development build for high-value production secrets.

## Reporting vulnerabilities
Please use GitHub private vulnerability reporting for this repository when available. Do not include real credentials, master passwords, private keys, session cookies, database passwords or production vault ciphertext in a public issue.

## Security design
See `docs/THREAT_MODEL.md`, `docs/DATABASE.md`, and `docs/FEATURES.md`. Security-sensitive changes should preserve the zero-knowledge boundary: vault plaintext and unwrapped vault keys stay client-side.

## Release gate
A production security claim requires reproducible release artifacts, dependency review, automated tests, threat-model review, independent cryptographic/application assessment, remediation of material findings, and documented backup/recovery exercises.
