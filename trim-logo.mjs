import sharp from 'sharp';

const input = '/home/z/my-project/public/nauka-logo-new.png';

// Get metadata first
const meta = await sharp(input).metadata();
console.log('Original size:', meta.width, 'x', meta.height);

// Trim whitespace with a small threshold
await sharp(input)
  .trim({ threshold: 10 })
  .toFile('/home/z/my-project/public/nauka-logo.png');

const trimmed = await sharp('/home/z/my-project/public/nauka-logo.png').metadata();
console.log('Trimmed size:', trimmed.width, 'x', trimmed.height);
