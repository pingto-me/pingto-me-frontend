import { IUserItem } from 'src/types/user';

export type AuthContextType = {
  user: IUserItem | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};
