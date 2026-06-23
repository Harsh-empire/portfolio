const Jimp = require('jimp');
Jimp.read('public/avatar.png').then(image => {
  console.log(`Width: ${image.bitmap.width}, Height: ${image.bitmap.height}`);
  const x = Math.floor(image.bitmap.width / 2);
  const y = 10;
  const idx = image.getPixelIndex(x, y);
  const r = image.bitmap.data[idx];
  const g = image.bitmap.data[idx+1];
  const b = image.bitmap.data[idx+2];
  console.log(`Top-center pixel: R=${r} G=${g} B=${b}`);
});
