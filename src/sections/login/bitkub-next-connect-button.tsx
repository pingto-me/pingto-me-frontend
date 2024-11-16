import { useRef, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';

import axios from 'src/utils/axios';
import { toastError } from 'src/utils/format-error';
import { bitkubNextSdk } from 'src/utils/bitkub-next';

import { setSession } from 'src/auth/context/utils';

import { LoginMethodEnum } from 'src/types/login-method.enum';

type Props = {
  connecting: boolean;
  startConnecting: () => void;
  endConnecting: () => void;
};

export default function BitkubNextConnectButton({
  connecting,
  startConnecting,
  endConnecting,
}: Props) {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    },
    []
  );

  const handleConnect = async () => {
    if (connecting) return;

    try {
      startConnecting();

      const loginStatus = await bitkubNextSdk.loginStatus();

      console.log({ loginStatus });

      if (loginStatus === 'CONNECTED') {
        await bitkubNextSdk.logout();
      }

      await bitkubNextSdk.loginWithBitkubNext();

      interval.current = setInterval(async () => {
        try {
          const userInfo = await bitkubNextSdk.getUserInfo();
          console.log(userInfo);
          if (interval.current && userInfo) {
            const { data: validate } = await axios.post('/auth/wallet/validate', {
              publicAddress: userInfo.walletAddress,
              walletType: LoginMethodEnum.BITKUBNEXT,
            });

            console.log({ validate });

            const { data: signin } = await axios.post('/auth/wallet/signin', {
              publicAddress: userInfo.walletAddress,
              signature: '123',
              walletType: LoginMethodEnum.BITKUBNEXT,
            });

            console.log({ signin });

            setSession(signin.tokens.accessToken, LoginMethodEnum.BITKUBNEXT);
            window.location.reload();

            clearInterval(interval.current);
            interval.current = null;
          }
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    } catch (error) {
      toastError(error);
    } finally {
      endConnecting();
    }
  };

  return (
    <LoadingButton
      variant="contained"
      loading={connecting}
      color="inherit"
      fullWidth
      size="large"
      onClick={handleConnect}
    >
      Connect via Bitkub Next Wallet
    </LoadingButton>
  );
}
