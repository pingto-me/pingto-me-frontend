'use client';

import { useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace(paths.root);
  }, [router]);

  return null;
}
