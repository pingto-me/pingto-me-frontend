import { IUserItem } from 'src/types/user';

export type TonContextType = {
  user: IUserItem | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  refresh: () => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => void;
};
