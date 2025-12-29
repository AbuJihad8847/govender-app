const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const indexFile = path.join(distDir, 'index.html');
const notFoundFile = path.join(distDir, '404.html');

try {
    if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile);
        console.log('Successfully copied index.html to 404.html for GitHub Pages.');
    } else {
        console.warn('dist/index.html not found, skipping 404.html creation.');
    }
} catch (error) {
    console.error('Error creating 404.html:', error);
    process.exit(1);
}
