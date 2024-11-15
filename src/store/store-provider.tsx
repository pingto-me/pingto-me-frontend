'use client';

import { Provider } from 'react-redux';
import { useRef, ReactNode } from 'react';

import { AppStore, makeStore } from './store';

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
