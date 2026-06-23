const Jimp = require('jimp');

async function removeBackground() {
  const image = await Jimp.read('public/cyberpunk_car.png');
  
  // We'll iterate over all pixels and make dark pixels transparent
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // The background of the AI image is mostly very dark gray/black
    // We check if RGB are all below 25
    if (r < 25 && g < 25 && b < 25) {
      this.bitmap.data[idx + 3] = 0; // Set Alpha to 0 (transparent)
    } else {
      // For anti-aliasing edge pixels (dark but not pitch black)
      // We can drop their opacity slightly
      if (r < 40 && g < 40 && b < 40) {
        this.bitmap.data[idx + 3] = 100;
      }
    }
  });
  
  await image.writeAsync('public/cyberpunk_car_transparent.png');
  console.log("Background removed successfully!");
}

removeBackground().catch(console.error);
