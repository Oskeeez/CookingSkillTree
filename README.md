# Mise

A Duolingo-style cooking journal. Pick a strand (Professional Chef or Home Cook), work along a path of meals, and log what you learned, the date you cooked it, videos you watched, notes and a photo.

It is an installable web app (PWA) that works offline. No build step, no dependencies.

## Install on a phone

Host the folder on any HTTPS site (GitHub Pages works), then open the URL:

- **iPhone (Safari):** Share, then Add to Home Screen.
- **Android (Chrome):** menu, then Install app (or Add to Home screen).

## Run locally

    python3 -m http.server 8000

Then open http://localhost:8000. The service worker only runs on localhost or HTTPS.

## Where data lives

Entries and photos are saved in the browser's `localStorage` on the device. They are not synced between devices.

## Files

- `index.html`: the whole app
- `manifest.webmanifest`, `sw.js`, `icons/`: install and offline support
