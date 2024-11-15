import { m } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { usePathname } from 'src/routes/hooks';

export default function SpringTransitions({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <m.div
      key={pathname}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </m.div>
  );
}
