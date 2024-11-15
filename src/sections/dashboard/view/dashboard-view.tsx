'use client';

import { Stack, Container } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';

export default function DashboardView() {
  const { disconnect } = useAuthContext();

  return (
    <Container maxWidth="xs">
      <Stack spacing={3} pb={3}>
        <button type="button" onClick={() => disconnect()}>
          disconnect
        </button>
      </Stack>
    </Container>
  );
}
