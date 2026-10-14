import { useRef, useState } from 'react';
import { Camera, ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  ALLOWED_IMAGE_TYPES,
  isImageTooLarge,
  isSupportedImage,
  processImageFile,
} from '../utils/image';
import GoalThumbnail from './GoalThumbnail';

function ImagePicker({ value, onChange }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const openPicker = () => inputRef.current?.click();

  const handleFile = async (file) => {
    if (!file) return;

    if (!isSupportedImage(file)) {
      setError(t.goalForm.errors.imageType);
      return;
    }
    if (isImageTooLarge(file)) {
      setError(t.goalForm.errors.imageSize);
      return;
    }

    setBusy(true);
    setError('');
    try {
      const dataUrl = await processImageFile(file);
      onChange(dataUrl);
    } catch {
      setError(t.goalForm.errors.imageRead);
    } finally {
      setBusy(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    setError('');
    onChange(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-4">
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {t.goalForm.imageLabel}
        </span>

        <button
          type="button"
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          aria-label={value ? t.goalForm.imageChange : t.goalForm.imageUpload}
          className={`group relative rounded-full p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 ${
            dragging
              ? 'bg-cyan-100 ring-2 ring-cyan-600 dark:bg-cyan-900/40'
              : 'bg-transparent'
          }`}
        >
          <GoalThumbnail size={84} image={value} />

          <span
            className={`absolute inset-1 flex items-center justify-center rounded-full bg-black/45 text-white transition-opacity ${
              busy ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            {busy ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Camera className="h-6 w-6" />
            )}
          </span>

          <span className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-800 text-white ring-2 ring-white dark:ring-slate-800">
            <Camera className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={openPicker}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-full border border-cyan-800 px-3.5 py-1.5 text-sm font-medium text-cyan-800 hover:bg-cyan-50 disabled:opacity-60 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-slate-700"
        >
          <ImagePlus className="h-4 w-4" />
          {busy
            ? t.goalForm.imageProcessing
            : value
              ? t.goalForm.imageChange
              : t.goalForm.imageUpload}
        </button>

        {value && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
            {t.goalForm.imageRemove}
          </button>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
        {t.goalForm.imageHint}
      </p>

      {error && (
        <p className="mt-1 text-center text-xs text-red-600" role="alert">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}

export default ImagePicker;
