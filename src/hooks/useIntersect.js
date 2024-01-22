// 참고 : https://tech.kakaoenterprise.com/149
import { useEffect, useCallback, useRef } from 'react';

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (onIntersect, options) => {
  const ref = useRef(null);
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, {
      ...defaultOption,
      ...options,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;
