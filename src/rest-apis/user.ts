import axios from 'src/utils/axios';

import { IUserItem } from 'src/types/user';

export async function getProfileApi() {
  const { data } = await axios.get<IUserItem>(`/users/me`);
  return data;
}
