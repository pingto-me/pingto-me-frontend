'use client';

import { useMemo, useState, useEffect } from 'react';
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { getDefaultExternalAdapters } from '@web3auth/default-evm-adapter';
import { IAdapter, IProvider, CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';

import Web3AuthContext from './web3auth-context';

type Props = {
  children: React.ReactNode;
};

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0xaa36a7',
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: 'Ethereum Sepolia Testnet',
  blockExplorerUrl: 'https://sepolia.etherscan.io',
  ticker: 'ETH',
  tickerName: 'Ethereum',
  logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

console.log('clientId', process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID);

const web3AuthOptions: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};
const web3auth = new Web3Auth(web3AuthOptions);

export default function Web3AuthProvider({ children }: Props) {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);

  console.log({ web3auth });

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - Configuring External Wallets
        const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        // IMP END - Configuring External Wallets
        // IMP START - SDK Initialization
        await web3auth.initModal();
        // IMP END - SDK Initialization
        setWeb3Auth(web3auth);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      web3Auth,
      setProvider,
      provider,
    }),
    [web3Auth, provider]
  );

  return <Web3AuthContext.Provider value={memoizedValue}>{children}</Web3AuthContext.Provider>;
}
