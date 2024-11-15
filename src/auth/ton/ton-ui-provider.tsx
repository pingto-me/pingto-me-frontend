'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

type Props = {
  children: React.ReactNode;
};

export default function TonUIProvider({ children }: Props) {
  return (
    <TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_TON_MANIFAST_URL}>
      {children}
    </TonConnectUIProvider>
  );
}
