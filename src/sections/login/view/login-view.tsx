'use client';

import { Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CenterStack } from 'src/components/box';

import TonConnectButton from '../ton-connect-button';

export default function LoginView() {
  const connecting = useBoolean(false);

  const connectingProps = {
    connecting: connecting.value,
    startConnecting: connecting.onTrue,
    endConnecting: connecting.onFalse,
  };

  return (
    <CenterStack
      sx={{ bgcolor: 'primary.main', width: '100vw', height: '100vh' }}
      spacing={2}
      p={2}
    >
      <CenterStack>
        <Typography
          variant="h1"
          color="common.black"
          fontSize={40}
          fontWeight={800}
          sx={{ fontFamily: (theme) => theme.typography.fontTertiaryFamily }}
        >
          Join CallVerz
        </Typography>
        <Typography variant="body2" color="common.black">
          please connect your wallet to continue
        </Typography>
      </CenterStack>
      <CenterStack spacing={1} width={1} maxWidth={380}>
        {/* <MetaMaskConnectButton {...connectingProps} /> */}
        <TonConnectButton {...connectingProps} />
      </CenterStack>
    </CenterStack>
  );
}
