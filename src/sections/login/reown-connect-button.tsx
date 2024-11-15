import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

import { Button } from '@mui/material';

import axios from 'src/utils/axios';
import { toastError } from 'src/utils/format-error';

import { setSession } from 'src/auth/context/utils';

import { LoginMethodEnum } from 'src/types/login-method.enum';

type Props = {
  connecting: boolean;
  startConnecting: () => void;
  endConnecting: () => void;
};

export default function ReownConnectButton({ connecting, startConnecting, endConnecting }: Props) {
  const { open } = useAppKit();
  const { isConnected } = useAccount();

  console.log('Reown isConnected', isConnected);

  useEffect(() => {
    (async () => {
      if (isConnected) {
        // TODO - process the code with backend + set session
        const { data } = await axios.post('/api/auth/login', {
          email: 'demo@minimals.cc',
          password: 'demo1234',
        });
        console.log({ data });

        const { accessToken } = data;
        setSession(accessToken, LoginMethodEnum.REOWN);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const handleConnect = async () => {
    if (connecting) return;
    try {
      startConnecting();
      // await bitkubNextSdk.loginWithBitkubNext();
      open();
    } catch (error) {
      toastError(error);
    } finally {
      endConnecting();
    }
  };
  return (
    <Button
      variant="contained"
      color="inherit"
      fullWidth
      size="large"
      // startIcon={<Box component="img" src={iconSrc('ic_connect_metamask')} />}
      onClick={handleConnect}
    >
      Connect via Reown
    </Button>
  );
}
