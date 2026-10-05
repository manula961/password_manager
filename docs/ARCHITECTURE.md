# Architecture

Clients encrypt/decrypt locally. The sync service stores ciphertext and minimal operational metadata. Platform keystores protect device-bound wrapping keys. Vault items use versioned encrypted envelopes so algorithms and key hierarchy can evolve without silently weakening old data.

## Product surfaces
Web/PWA, Android/iOS, Windows/macOS/Linux, Chrome/Edge/Firefox/Safari, CLI — one account and compatible encrypted vault format.
