import { useTonWallet } from '@tonconnect/ui-react';

import { Stack, Avatar, Typography, LinearProgress } from '@mui/material';

import { fShortenAddress } from 'src/utils/format-address';

export default function DashboardUserCard() {
  const wallet = useTonWallet();

  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ width: 64, height: 64 }} src="/assets/images/avatar_1.svg">
        A
      </Avatar>
      <Stack width={1}>
        <Typography variant="h6">Greetings, {fShortenAddress(wallet?.account.address)}</Typography>
        <Typography variant="caption" color="primary">
          Level 24
        </Typography>
        <Typography variant="caption">Stamina Remains (48/100)</Typography>
        <LinearProgress variant="determinate" value={40} sx={{ mt: 1 }} />
      </Stack>
    </Stack>
  );
}
