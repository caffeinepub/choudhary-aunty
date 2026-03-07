import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Module-level in-memory cache shared across all hook instances
const cache = new Map<string, CacheEntry<unknown>>();

/**
 * Lightweight cache hook that wraps an async fetcher with a 5-minute stale time.
 * Avoids re-fetching on every navigation when data is still fresh.
 *
 * Usage:
 *   const { data, loading } = useDataCache('all-products', () => actor.getAllProducts())
 */
export function useDataCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { enabled?: boolean },
) {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const query = useQuery<T>({
    queryKey: ["data-cache", key],
    queryFn: async () => {
      const cached = cache.get(key) as CacheEntry<T> | undefined;
      if (cached && Date.now() - cached.timestamp < STALE_TIME) {
        return cached.data;
      }
      const result = await fetcherRef.current();
      cache.set(key, { data: result, timestamp: Date.now() });
      return result;
    },
    staleTime: STALE_TIME,
    enabled: options?.enabled !== false,
  });

  const refetch = useCallback(async () => {
    // Clear from in-memory cache to force fresh fetch
    cache.delete(key);
    await query.refetch();
  }, [key, query]);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch,
  };
}
