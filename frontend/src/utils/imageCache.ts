import { ImageCacheData } from "../types/imageCacheData";

const STORAGE_KEY = "presignedImageCache";

const loadCache = (): Record<string, ImageCacheData> => {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Record<string, ImageCacheData>;
    const now = Date.now();
    const filtered: Record<string, ImageCacheData> = {};

    for (const key in parsed) {
      if (parsed[key].expiresAt > now) {
        filtered[key] = parsed[key];
      }
    }

    // 掃除後に保存し直す
    saveCache(filtered);

    return filtered;
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
  ttlMs = 144 * 60 * 1000
) => {
  const cache = loadCache();
  cache[key] = {
    url,
    expiresAt: Date.now() + ttlMs,
  };
  saveCache(cache);
};
