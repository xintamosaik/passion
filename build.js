const esbuild = require('esbuild');


esbuild.build({
  entryPoints: ['src/game.ts'],
  bundle: true,
  outdir: 'dist',
  plugins: [],
}).catch(() => process.exit(1));
