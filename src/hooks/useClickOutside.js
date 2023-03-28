import { useEffect, useCallback } from 'react';

export function useClickOutside(querySelector, cb) {
  const onClickOutside = useCallback(
    (e) => {
      if (e.target.closest(querySelector)) {
        return;
      }

      cb();
    },
    [querySelector, cb]
  );

  useEffect(() => {
    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, [onClickOutside]);
}
