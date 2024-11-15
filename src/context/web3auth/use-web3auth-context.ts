'use client';

import { useContext } from 'react';

import Web3AuthContext from './web3auth-context';

// ----------------------------------------------------------------------

export const useWeb3AuthContext = () => {
  const context = useContext(Web3AuthContext);

  if (!context) throw new Error('useWeb3AuthContext context must be use inside TonProvider');

  return context;
};
