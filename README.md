# For Jaya, with love

A cinematic birthday surprise from Akshay, built with React, Vite, Tailwind CSS, Motion, and Lucide icons.

## Run locally

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Deploy the `dist/` directory to static hosting at the domain root.

## Features

- Responsive birthday landing page with an animated J monogram.
- Four personal photographs with staggered entrances, sparkles, glow, and an accessible lightbox.
- Swipe and keyboard navigation, focus management, and scroll locking.
- Personalized qualities and an animated envelope with a scrollable love letter.
- Smooth section color transitions, falling hearts, and Canvas fireworks.
- Reduced-motion support, bounded particles, and mobile layouts.

## Customize

- `src/data/gallery.js`: photographs and captions.
- `src/data/photoSizes.js`: intrinsic image dimensions for layout stability.
- `src/data/letter.js`: letter, signature, and simple bold/italic emphasis.
- `src/data/qualities.js`: the five personalized qualities.
- `src/components/BirthdayHero.jsx`: landing text.
- `src/components/Atmosphere.jsx`: section colors and gradients.
- `src/styles/`: base styles and subsequent visual refinements.

Images are under `public/assets/images/`; paths in code start with `/assets/images/`.

## Optional music

Add your own licensed track at `public/assets/music/birthday-song.mp3` and rebuild. The music button appears only when a track is included. Playback requires a click and never autoplays.

## Verification

The production build passes. Visual browser QA was unavailable in the implementation environment; check the experience on your target desktop and mobile browsers.

Personal photos and text are included for this birthday website. No license for reuse is granted by this repository.
