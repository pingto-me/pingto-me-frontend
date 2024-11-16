import {
  useIsLoggedIn,
  useDynamicContext,
  DynamicConnectButton,
} from '@dynamic-labs/sdk-react-core';

import { useDeepEffect } from 'src/hooks/use-deep-effect';

import axios from 'src/utils/axios';

import { setSession } from 'src/auth/context/utils';

import { LoginMethodEnum } from 'src/types/login-method.enum';

type Props = {
  connecting: boolean;
  startConnecting: () => void;
  endConnecting: () => void;
};

export default function AppDynamicConnectButton({
  connecting,
  startConnecting,
  endConnecting,
}: Props) {
  const isLoggedIn = useIsLoggedIn();
  const { primaryWallet } = useDynamicContext();

  console.log('Dynamic isLoggedIn', isLoggedIn);
  console.log('Dynamic primaryWallet', primaryWallet);

  useDeepEffect(() => {
    (async () => {
      if (isLoggedIn) {
        if (!primaryWallet) return;

        console.log('do');

        // const { data } = await axios.post(`/auth/signin/public-address`, {
        //   publicAddress: primaryWallet.address,
        // });

        // const signature = await primaryWallet.signMessage(data.data.msg);

        // TODO - process the code with backend + set session

        const { data: validate } = await axios.post('/auth/wallet/validate', {
          publicAddress: primaryWallet.address,
          walletType: LoginMethodEnum.DYNAMIC,
        });

        console.log('------------');
        console.log({ validate });

        const signature = await primaryWallet.signMessage(validate.msg);

        const { data: signin } = await axios.post('/auth/wallet/signin', {
          publicAddress: primaryWallet.address,
          signature,
          walletType: LoginMethodEnum.DYNAMIC,
        });

        console.log('signin', signin);

        setSession(signin.tokens.accessToken, LoginMethodEnum.DYNAMIC);
        window.location.reload();

        // const { data } = await axios.post('/api/auth/login', {
        //   email: 'demo@minimals.cc',
        //   password: 'demo1234',
        // });
        // console.log({ data });

        // const { accessToken } = data;
        // setSession(accessToken, LoginMethodEnum.DYNAMIC);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return <DynamicConnectButton>Connect via Dynamic</DynamicConnectButton>;
}
