import { useCallback } from 'react';

import { paths } from '../paths';
import { useRouter } from './use-router';

export function useGoBack() {
  const router = useRouter();

  const back = useCallback(
    (href?: string) => {
      if (window.history?.length && window.history.length > 1) {
        router.back();
      } else {
        router.replace(href || paths.root);
      }
    },
    [router]
  );

  return back;
}
