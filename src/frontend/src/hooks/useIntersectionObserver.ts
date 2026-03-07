import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Simple hook for intersection observer — useful for infinite scroll / lazy loading.
 *
 * Usage:
 *   const ref = useIntersectionObserver(callback, { threshold: 0.1 })
 *   <div ref={ref} />
 */
export function useIntersectionObserver<T extends Element>(
  callback: (isIntersecting: boolean) => void,
  options: UseIntersectionObserverOptions = {},
): React.RefObject<T | null> {
  const { threshold = 0.1, rootMargin = "0px", once = false } = options;
  const ref = useRef<T | null>(null);
  const firedRef = useRef(false);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (once && firedRef.current) return;
          callbackRef.current(entry.isIntersecting);
          if (once && entry.isIntersecting) {
            firedRef.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
