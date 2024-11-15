import { Button } from '@mui/material';

import { toastError } from 'src/utils/format-error';
import { bitkubNextSdk } from 'src/utils/bitkub-next';

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
  const handleConnect = async () => {
    if (connecting) return;
    try {
      startConnecting();
      await bitkubNextSdk.loginWithBitkubNext();
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
      Connect via Bitkub Next Wallet
    </Button>
  );
}
