// eslint-disable-next-line import/no-cycle

export type IUserItem = {
  id: string;
  role: string;
  provider: string;
  referralCode: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  providerData: ProviderData;
  isSkipReference?: boolean;
};

type ProviderData = {
  id: string;
  userId: string;
  provider: string;
  isVerified: boolean;
  walletAddress: string;
};
