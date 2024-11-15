import { Button } from '@mui/material';

import { toastError } from 'src/utils/format-error';

import { useWeb3AuthContext } from 'src/context/web3auth/use-web3auth-context';

type Props = {
  connecting: boolean;
  startConnecting: () => void;
  endConnecting: () => void;
};

export default function Web3AuthConnectButton({
  connecting,
  startConnecting,
  endConnecting,
}: Props) {
  const { web3Auth, setProvider } = useWeb3AuthContext();

  const handleConnect = async () => {
    console.log('web3Auth', web3Auth);
    if (connecting || !web3Auth) return;
    startConnecting();
    try {
      // IMP START - Login
      const web3authProvider = await web3Auth.connect();
      // IMP END - Login
      setProvider(web3authProvider);
      if (web3Auth.connected) {
        //  setLoggedIn(true);
      }
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
      Connect via Web3Auth
    </Button>
  );
}
