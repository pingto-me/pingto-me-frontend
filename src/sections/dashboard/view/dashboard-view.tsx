'use client';

import { Stack, Container } from '@mui/material';

import { localStorageGetItem } from 'src/utils/storage-available';

import { useAuthContext } from 'src/auth/hooks';
import { LOGIN_METHOD_STORAGE_KEY } from 'src/config-global';

export default function DashboardView() {
  const { disconnect } = useAuthContext();

  const loginMethod = localStorageGetItem(LOGIN_METHOD_STORAGE_KEY);

  return (
    <Container maxWidth="xs">
      <Stack spacing={3} pb={3}>
        connect with {loginMethod}
        <button type="button" onClick={() => disconnect()}>
          disconnect
        </button>
      </Stack>
    </Container>
  );
}
