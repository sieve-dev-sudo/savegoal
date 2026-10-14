export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
export const MAX_IMAGE_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const IMAGE_OUTPUT_SIZE = 256;
export const IMAGE_QUALITY = 0.82;

export function isSupportedImage(file) {
  return Boolean(file) && ALLOWED_IMAGE_TYPES.includes(file.type);
}

export function isImageTooLarge(file) {
  return file.size > MAX_IMAGE_FILE_BYTES;
}

// ឆែកថា string ជា data URL នៃរូបភាពពិតមែន (ប្រើពេល Import backup)
export function isImageDataUrl(value) {
  return typeof value === 'string' && value.startsWith('data:image/');
}

// គណនាការ៉េកណ្តាលដែលត្រូវកាត់ពីរូបដើម (cover crop)
export function getCoverRect(width, height) {
  const side = Math.min(width, height);
  return {
    sx: Math.round((width - side) / 2),
    sy: Math.round((height - side) / 2),
    side,
  };
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// កាត់ជាការ៉េ បង្រួម រួចបម្លែងជា JPEG data URL សម្រាប់រក្សាក្នុង localStorage
export async function processImageFile(
  file,
  size = IMAGE_OUTPUT_SIZE,
  quality = IMAGE_QUALITY
) {
  const url = URL.createObjectURL(file);

  try {
    const img = await loadImage(url);
    const { sx, sy, side } = getCoverRect(img.naturalWidth, img.naturalHeight);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    // ផ្ទៃសក្រោយ ដើម្បីកុំឱ្យ PNG ថ្លាប្រែជាខ្មៅពេលបម្លែងជា JPEG
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);

    return canvas.toDataURL('image/jpeg', quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}
