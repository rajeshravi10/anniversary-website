# First Anniversary Surprise ❤️

A premium mobile-first romantic anniversary experience built with React, Vite, Tailwind CSS, and Framer Motion.

## Setup

1. Add your images to `public/`:
   - `marriage-image.jpg`
   - `gift-image.jpg`
2. Optional: add `romantic-music.mp3` for background music
3. Install and run:

```bash
npm install
npm run dev
```

Open on your phone (or resize browser to **390px** width) for the intended experience.

## Desktop testing

While testing on desktop, each memory card shows **Next → (testing)**. When you are ready to share, open `src/config.ts` and set:

```ts
export const SHOW_TEST_NEXT_BUTTON = false
```

## Build for sharing

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Netlify, Vercel, or GitHub Pages. The Open Graph meta tags in `index.html` help WhatsApp link previews.

## Experience

- Intro → 10 unlockable memories → cinematic final reveal with gift
- Progress bar and Love Battery (10%–100%)
- Floating hearts, sparkles, confetti, haptic feedback
- Secret letter modal: "One More Surprise ❤️"

Made with love by Rajesh.
