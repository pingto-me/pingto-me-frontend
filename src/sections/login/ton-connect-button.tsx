import { Box, Button } from '@mui/material';

import { iconSrc } from 'src/utils/icon';
import { toastError } from 'src/utils/format-error';

import { useTonContext } from 'src/auth/ton/hooks';

type Props = {
  connecting: boolean;
  startConnecting: () => void;
  endConnecting: () => void;
};

export default function TonConnectButton({ connecting, startConnecting, endConnecting }: Props) {
  const { connect } = useTonContext();

  const handleSingInWithTelegram = async () => {
    if (connecting) return;
    try {
      startConnecting();
      await connect();
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
      startIcon={<Box component="img" src={iconSrc('ic_connect_telegram')} />}
      onClick={handleSingInWithTelegram}
    >
      Connect via Telegram wallet
    </Button>
  );
}
