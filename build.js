const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/game.ts'],
  bundle: true,
  outdir: 'dist',
  plugins: [],
}).then(() => {
    console.log('Build succeeded');
    // call tailwind css
    const { exec } = require('child_process');
    exec('npx tailwindcss -i ./src/input.css -o dist/styles.css', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });

    
    

    // move index.html to dist
    const fs = require('fs');
    fs.copyFileSync('src/index.html', 'dist/index.html');

    process.exit(0);
}).catch(() => process.exit(1));

