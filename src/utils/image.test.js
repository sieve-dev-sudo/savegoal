import { describe, it, expect } from 'vitest';
import {
  MAX_IMAGE_FILE_BYTES,
  getCoverRect,
  isImageDataUrl,
  isImageTooLarge,
  isSupportedImage,
} from './image';

describe('isSupportedImage', () => {
  it('accepts jpeg, png, webp and gif', () => {
    ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].forEach((type) => {
      expect(isSupportedImage({ type })).toBe(true);
    });
  });

  it('rejects non-image files', () => {
    expect(isSupportedImage({ type: 'application/pdf' })).toBe(false);
    expect(isSupportedImage({ type: 'text/plain' })).toBe(false);
  });

  it('rejects a missing file', () => {
    expect(isSupportedImage(null)).toBe(false);
    expect(isSupportedImage(undefined)).toBe(false);
  });
});

describe('isImageTooLarge', () => {
  it('allows files up to the limit', () => {
    expect(isImageTooLarge({ size: MAX_IMAGE_FILE_BYTES })).toBe(false);
  });

  it('rejects files over the limit', () => {
    expect(isImageTooLarge({ size: MAX_IMAGE_FILE_BYTES + 1 })).toBe(true);
  });
});

describe('isImageDataUrl', () => {
  it('accepts image data URLs', () => {
    expect(isImageDataUrl('data:image/jpeg;base64,AAAA')).toBe(true);
  });

  it('rejects other strings and values', () => {
    expect(isImageDataUrl('https://example.com/a.png')).toBe(false);
    expect(isImageDataUrl('javascript:alert(1)')).toBe(false);
    expect(isImageDataUrl('data:text/html;base64,AAAA')).toBe(false);
    expect(isImageDataUrl(null)).toBe(false);
    expect(isImageDataUrl(123)).toBe(false);
  });
});

describe('getCoverRect', () => {
  it('crops the horizontal center of a landscape image', () => {
    expect(getCoverRect(400, 200)).toEqual({ sx: 100, sy: 0, side: 200 });
  });

  it('crops the vertical center of a portrait image', () => {
    expect(getCoverRect(200, 400)).toEqual({ sx: 0, sy: 100, side: 200 });
  });

  it('uses the whole image when it is already square', () => {
    expect(getCoverRect(300, 300)).toEqual({ sx: 0, sy: 0, side: 300 });
  });
});
