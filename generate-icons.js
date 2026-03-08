import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = fs.readFileSync('public/vite.svg');

async function generateIcons() {
    // PWA Icons
    await sharp(svgBuffer)
        .resize(192, 192)
        .png()
        .toFile('public/pwa-192x192.png');

    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile('public/pwa-512x512.png');

    // Apple Touch Icon
    await sharp(svgBuffer)
        .resize(180, 180)
        .flatten({ background: '#FFF8F0' })
        .png()
        .toFile('public/apple-touch-icon.png');

    // Maskable Icon
    await sharp(svgBuffer)
        .resize(512, 512)
        .flatten({ background: '#FFF8F0' })
        .png()
        .toFile('public/masked-icon.png');

    console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);
