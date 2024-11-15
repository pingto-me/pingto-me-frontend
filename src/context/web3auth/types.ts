import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

export type Web3AuthContextType = {
  web3Auth: Web3Auth | null;
  provider: IProvider | null;
  setProvider: (provider: IProvider | null) => void;
};
