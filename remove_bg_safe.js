const Jimp = require('jimp');

Jimp.read('public/cyberpunk_car.png', (err, image) => {
  if (err) throw err;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    if (r < 30 && g < 30 && b < 30) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  
  image.write('public/car_clear.png', (err) => {
    if (err) throw err;
    console.log("Done saving car_clear.png");
  });
});
