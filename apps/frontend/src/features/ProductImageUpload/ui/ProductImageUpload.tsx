'use client';

import { useEffect, useRef, useState } from 'react';
import { axiosClassic } from '@/core/configs/axios.config';

type Props = {
  productId: number;
  initialUrl?: string;
};

export function ProductImageUpload({ productId, initialUrl }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState(initialUrl);
  const [isUploading, setUploading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openFileDialog = () => {
    if (isUploading || isDeleting) return;
    inputRef.current?.click();
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Выберите изображение (JPEG/PNG/WebP…)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Файл слишком большой (макс. 5MB)');
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await axiosClassic.post<{ photo_url: string }>(
        `/products/${productId}/photo`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      setUrl(res.data.photo_url);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Не удалось загрузить файл');
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!url) return;
    setError(null);
    setDeleting(true);
    try {
      await axiosClassic.delete(`/products/${productId}/photo`);
      setUrl(undefined);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Не удалось удалить изображение');
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  return (
    <div
      className="relative w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={openFileDialog}
      aria-label="Загрузить изображение"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileSelected}
      />

      {url ? (
        <>
          <img
            src={url}
            alt="Product"
            className="w-full h-full object-cover pointer-events-none select-none"
          />

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting || isUploading}
            className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white text-sm hover:bg-black/75 disabled:opacity-60"
            aria-label="Удалить изображение"
          >
            ×
          </button>
        </>
      ) : (
        <span className="text-gray-400 text-sm text-center">
          Пусто, нажмите чтобы выбрать картинку
        </span>
      )}

      {(isUploading || isDeleting) && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <span className="animate-pulse text-white text-sm">
            {isUploading ? 'Загрузка...' : 'Удаление...'}
          </span>
        </div>
      )}

      {error && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-red-600 text-xs">
          {error}
        </div>
      )}
    </div>
  );
}
