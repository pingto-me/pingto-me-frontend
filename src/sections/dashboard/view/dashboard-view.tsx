'use client';

import { Stack, Button, Container } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import DashboardStats from '../dashboard-stats';
import DashboardMainMenu from '../dashboard-main-menu';
import DashboardUserCard from '../dashboard-user-card';

export default function DashboardView() {
  return (
    <Container maxWidth="xs">
      <Stack spacing={3} pb={3}>
        <DashboardUserCard />
        <Button
          component={RouterLink}
          href={paths.report}
          variant="contained"
          color="primary"
          size="large"
        >
          Report
        </Button>
        <DashboardMainMenu />
        <DashboardStats />
      </Stack>
    </Container>
  );
}
