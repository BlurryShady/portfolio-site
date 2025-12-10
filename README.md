# BlurryShady Portfolio

A cinematic React + Vite portfolio site that acts as the main landing page for my other projects that I've did as full-stack developer. It combines a marble gallery aesthetic with an interactive, shader-driven sea backdrop and showcases current flagship projects.

## Highlights
- Three.js ocean scene with custom ripple shaders and layout-aware obstacles that part the water around content.
- Marble-inspired gallery cards which I turned into stone design later that transition from blurred to sharp on hover to emphasize clarity-through-craft.
- Inline project detail banner that anchors beside the selected card without navigating away.
- Fully responsive layout tuned for desktop and mobile breakpoints.
- Built as a pure frontend so it can deploy anywhere (Netlify, Vercel, GitHub Pages, etc.).

## Tech Stack
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS, custom CSS marble patterns
- **Animation**: Framer Motion
- **3D / WebGL**: Three.js, @react-three/fiber, @react-three/drei, `three-stdlib`
- **Linting / Tooling**: ESLint, Playwright placeholder for future tests

## Projects Showcased
| Project | Stack | Notes |
| --- | --- | --- |
| Blog Project | Python, Django, Bootstrap | Authenticated blog engine with profile management and CRUD posts. |
| Task Manager | Python, Django, DRF, SQLite | Backend task boards with invitations, REST API, and secure validation. |
| Gear Store E-commerce | React, Tailwind, Django REST, PostgreSQL | Full-stack storefront with filters, cart total, and dynamic product pages. |
| Marvel Rivals Team Builder | React, Django, Tailwind, PostgreSQL | Real-time team analyzer with hero synergies, auth, sharing, and WebSocket updates. |

## Getting Started
```bash
# install
npm install

# run locally
npm run dev

# lint
npm run lint

# production build
npm run build

# preview build locally
npm run preview
```
Requires Node.js 18+ (or any runtime supported by Vite 7).

## Deployment (Netlify example)
1. Create a new GitHub repository and push this project.
2. In Netlify, choose **Add new site → Import from Git** and select the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Trigger the first deploy; subsequent pushes to `main` will redeploy automatically.

## Customization Notes
- Update project entries in `src/data/project.js` to change gallery content.
- `src/components/SeaScene.jsx` controls the ocean shader colors, camera, and ripple mask.
- Tailwind + custom CSS lives in `src/index.css` for global typography, marble cards, and blur effects.

## Roadmap Ideas
- Hook Netlify forms or Supabase to capture contact messages directly from the landing page.
- Add Playwright smoke tests for key hover/selection interactions.
- Surface live links for every showcased project once deployments are ready.

---
Crafted by Blurry Shady · Full-stack developer focused on premium web experiences.
