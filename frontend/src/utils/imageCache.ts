import { ImageCacheData } from "../types/imageCacheData";

const STORAGE_KEY = "presignedImageCache";

const loadCache = (): Record<string, ImageCacheData> => {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const saveCache = (cache: Record<string, ImageCacheData>) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
};

export const getCachedImageUrl = (key: string): string | null => {
  const cache = loadCache();
  const data = cache[key];
  if (data && data.expiresAt > Date.now()) {
    return data.url;
  }
  return null;
};

export const setCachedImageUrl = (
  key: string,
  url: string,
  ttlMs = 5 * 60 * 1000
) => {
  const cache = loadCache();
  cache[key] = {
    url,
    expiresAt: Date.now() + ttlMs,
  };
  saveCache(cache);
};
