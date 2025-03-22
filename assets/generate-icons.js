const sharp = require('sharp');

// Create a simple icon with a solid color and text
const width = 1024;
const height = 1024;
const backgroundColor = '#6200ee';

// Create base SVG for the icon
const svgIcon = `
<svg width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  <circle cx="${width/2}" cy="${height/2}" r="${width/3}" fill="white"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${width/4}" 
        fill="${backgroundColor}" text-anchor="middle" dy=".35em">J</text>
</svg>`;

// Create base SVG for the splash screen
const splashWidth = 1242;
const splashHeight = 2436;
const svgSplash = `
<svg width="${splashWidth}" height="${splashHeight}">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  <circle cx="${splashWidth/2}" cy="${splashHeight/2}" r="300" fill="white"/>
  <text x="50%" y="50%" font-family="Arial" font-size="150" 
        fill="${backgroundColor}" text-anchor="middle" dy=".35em">J</text>
  <text x="50%" y="${splashHeight/2 + 400}" font-family="Arial" font-size="100" 
        fill="white" text-anchor="middle">Jwandoon</text>
</svg>`;

// Generate icon.png
sharp(Buffer.from(svgIcon))
  .png()
  .toFile('assets/icon.png')
  .catch(err => console.error('Error generating icon:', err));

// Generate adaptive-icon.png
sharp(Buffer.from(svgIcon))
  .png()
  .toFile('assets/adaptive-icon.png')
  .catch(err => console.error('Error generating adaptive icon:', err));

// Generate splash.png
sharp(Buffer.from(svgSplash))
  .png()
  .toFile('assets/splash.png')
  .catch(err => console.error('Error generating splash:', err)); 