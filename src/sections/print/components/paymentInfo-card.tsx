import React from 'react';

import { Box, Card, Stack, Divider, Typography } from '@mui/material';

// Replace with your Iconify setup

type Props = {
  price: any;
};

const PaymentInfoCard = ({ price }: Props) => (
  <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
    {/* Details Section */}
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Details
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Card Printing
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Category: Profile Card
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            {price.usd} USD{' '}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />
    </Box>

    {/* Pricing Details */}
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Subtotal
      </Typography>
      <Typography variant="body2">{price.usd} USD</Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Shipping
      </Typography>
      <Typography variant="body2">0 USD</Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Discount
      </Typography>
      <Typography variant="body2" sx={{ color: 'error.main' }}>
        -0 USD
      </Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Taxes
      </Typography>
      <Typography variant="body2">0 USD</Typography>
    </Stack>
    <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Total
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {price.usd} USD
      </Typography>
    </Stack>

    {/* Footer */}
    <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          You are now connected to Bitkub Chain
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
          Your KUB balance: <b>3,601.24</b>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="body2" color="text.primary">
          {price.kub} KUB
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ~ {price.usd} USD
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Coin price provided by Chainlink
        </Typography>
      </Box>
    </Box>
  </Card>
);

export default PaymentInfoCard;
