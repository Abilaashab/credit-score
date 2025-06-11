const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 64, 192, 512];
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'logo.svg');

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate PNGs
    await Promise.all([
      sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'logo192.png')),
      sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'logo512.png')),
    ]);

    // Generate ICO (multiple sizes)
    const icoBuffers = await Promise.all(
      sizes.map(size => 
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Write favicon.ico
    const ico = require('png-to-ico');
    const icoBuffer = await ico(icoBuffers);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 