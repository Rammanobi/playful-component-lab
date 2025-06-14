import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Add security headers for dev server
  server: {
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      // A basic CSP for dev; in production, use your host/CDN for robust CSP
      "Content-Security-Policy": "default-src 'self' blob: data:; script-src 'self' 'unsafe-eval'; connect-src *; img-src * data: blob:; style-src 'self' 'unsafe-inline'; font-src 'self';",
    }
  }
});
