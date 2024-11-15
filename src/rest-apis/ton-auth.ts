import { Account, TonProofItemReplySuccess } from '@tonconnect/ui-react';

import axios from 'src/utils/axios';

import { TonProofPayload } from 'src/types/auth';

export async function generateProofPayloadApi() {
  const { data } = await axios.get<string>(`/auth/ton/proof`);
  return data;
}

export async function checkProofApi(proof: TonProofItemReplySuccess['proof'], account: Account) {
  const body = {
    proof: { payload: proof.payload },
    account,
  };

  const { data } = await axios.post<TonProofPayload>(`/auth/ton/signin`, body);
  return data;
}
