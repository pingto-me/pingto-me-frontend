import { IUserItem } from './user';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type TonProofPayload = {
  tokens: Token;
  user: IUserItem;
};
