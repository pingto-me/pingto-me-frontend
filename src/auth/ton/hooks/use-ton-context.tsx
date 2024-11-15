'use client';

import { useContext } from 'react';

import { TonContext } from '../context';

// ----------------------------------------------------------------------

export const useTonContext = () => {
  const context = useContext(TonContext);

  if (!context) throw new Error('useTonContext context must be use inside TonProvider');

  return context;
};
