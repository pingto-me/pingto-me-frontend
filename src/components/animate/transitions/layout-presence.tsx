'use client';

import { PropsWithChildren } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Box } from '@mui/material';

import SpringTransitions from './spring-transitions';

export default function LayoutPresence({ children }: PropsWithChildren) {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <SpringTransitions>{children}</SpringTransitions>
      </AnimatePresence>
    </Box>
  );
}
