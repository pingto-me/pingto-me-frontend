import { Network, initializeSDK } from '@bitkub-chain/sdk.js';

export const bitkubNextSdk = initializeSDK(
  process.env.NEXT_PUBLIC_BITKUB_NEXT_CLIENT_ID!,
  process.env.NEXT_PUBLIC_BITKUB_NEXT_PROJECT_ID!,
  Network.BKC_TESTNET,
  {
    loginRedirectPath: '/oauth/bitkub',
  }
);
