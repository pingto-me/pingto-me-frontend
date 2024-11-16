import axios from 'src/utils/axios';

export async function getCard(code: string) {
  const { data } = await axios.get<any>(`/cards/${code}`);
  return data;
}
export async function getCardByCode(code: string) {
  const { data } = await axios.get<any>(`/cards/code/${code}`);
  return data;
}

export async function redeemCard(code: string) {
  const { data } = await axios.post<any>(`/cards/claim-card/${code}`);
  return data;
}
