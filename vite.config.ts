import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' = relative asset URLs, so the build works under ANY repo name.
// HashRouter (see src/App.jsx) means refresh/direct links need no server rewrites.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
});
