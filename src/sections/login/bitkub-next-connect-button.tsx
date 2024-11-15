import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

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
  const router = useRouter();

  const handleSingInWithMetamask = async () => {
    if (connecting) return;
    try {
      startConnecting();
      await bitkubNextSdk.loginWithBitkubNext();
      router.push(paths.dashboard);
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
      onClick={handleSingInWithMetamask}
    >
      Connect via Bitkub Next Wallet
    </Button>
  );
}
