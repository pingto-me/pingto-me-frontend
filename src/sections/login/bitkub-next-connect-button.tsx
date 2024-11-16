import { LoadingButton } from '@mui/lab';

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
      const userInfo = await bitkubNextSdk.getUserInfo();
      if (userInfo) {
        await bitkubNextSdk.logout();
      }
      await bitkubNextSdk.loginWithBitkubNext();
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
      // startIcon={<Box component="img" src={iconSrc('ic_connect_metamask')} />}
      onClick={handleConnect}
    >
      Connect via Bitkub Next Wallet
    </LoadingButton>
  );
}
