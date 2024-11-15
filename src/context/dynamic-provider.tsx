'use client';

import { http } from 'viem';
import { createConfig } from 'wagmi';
import { sepolia } from 'viem/chains';
import { PropsWithChildren } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { FlowWalletConnectors } from '@dynamic-labs/flow';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

const config = createConfig({
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http('https://1rpc.io/sepolia'),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({ children }: PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID!,
        walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors],
      }}
    >
      {children}
      {/* <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider> */}
    </DynamicContextProvider>
  );
}
