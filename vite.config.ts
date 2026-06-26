// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Lovable CDN host used to serve uploaded assets (/__l5e/assets-v1/...).
// On Lovable preview/published the platform serves this path directly.
// Locally (bun run dev) the path 404s, so we proxy it to the project's
// preview host so videos/images load identically in both environments.
const LOVABLE_ASSET_HOST =
  "https://id-preview--adbe1bf4-09ba-4030-bf4b-953bae658cc2.lovable.app";

export default defineConfig({
  tanstackStart: {
    server: { preset: "static" }, // gera output estático
  },
  vite: {
    // Base path para GitHub Pages servido em https://<user>.github.io/portfolio_guilhermev_dev/
    base: "/portfolio_guilhermev_dev/",
    
    server: {
      proxy: {
        "/__l5e": {
          target: LOVABLE_ASSET_HOST,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});