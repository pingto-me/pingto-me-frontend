import { m } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { usePathname } from 'src/routes/hooks';

const variants = {
  fadeIn: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  fadeOut: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export default function EaseTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <m.div key={pathname} variants={variants} initial="fadeIn" animate="inactive" exit="fadeOut">
      {children}
    </m.div>
  );
}
