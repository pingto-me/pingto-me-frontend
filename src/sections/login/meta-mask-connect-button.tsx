import { Box, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { iconSrc } from 'src/utils/icon';
import { toastError } from 'src/utils/format-error';

type Props = {
  connecting: boolean;
  startConnecting: () => void;
  endConnecting: () => void;
};

export default function MetaMaskConnectButton({
  connecting,
  startConnecting,
  endConnecting,
}: Props) {
  const router = useRouter();

  const handleSingInWithMetamask = async () => {
    if (connecting) return;
    try {
      startConnecting();
      // const walletAddress = await connect();
      // await login(walletAddress, WalletLoginMethod.MetaMask);
      router.push(paths.dashboard);
    } catch (error) {
      toastError(error);
    } finally {
      endConnecting();
    }
  };

  if (typeof window.ethereum !== 'undefined') {
    return (
      <Button
        variant="contained"
        color="inherit"
        fullWidth
        size="large"
        startIcon={<Box component="img" src={iconSrc('ic_connect_metamask')} />}
        onClick={handleSingInWithMetamask}
      >
        Connect via Metamask wallet
      </Button>
    );
  }
  return null;
}
