
/**
 * This component exists only for development and internal docs.
 * In production, always set security headers (CSP, etc.) on your web server or CDN.
 */
export const SecurityHeaders = () => (
  <div className="p-4 my-4 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-900 rounded">
    <p><b>Dev Note:</b> Security headers including CSP, X-Frame-Options, and Referrer-Policy are set in the Vite dev server (vite.config.ts). Ensure to configure these on your hosting platform for production!</p>
  </div>
);
