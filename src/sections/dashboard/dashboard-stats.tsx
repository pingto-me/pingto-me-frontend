import { Stack, Typography } from '@mui/material';

import { fNumber } from 'src/utils/format-number';

import { CenterStack } from 'src/components/box';

export default function DashboardStats() {
  const renderCard = (title: string, value: number) => (
    <CenterStack
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        height: 94,
        width: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="h4" color="primary.main">
        {fNumber(value)}
      </Typography>
      <Typography variant="body2">{title}</Typography>
    </CenterStack>
  );

  return (
    <Stack spacing={2}>
      <Typography fontWeight={700}>Your Stats</Typography>
      <Stack spacing={2}>
        {renderCard('Badges', 0)}

        <Stack spacing={2} direction="row">
          {renderCard('Points', 0)}
          {renderCard('Transactions', 0)}
        </Stack>
      </Stack>
    </Stack>
  );
}
