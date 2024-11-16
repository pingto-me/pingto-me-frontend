import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify'; // Replace with your Iconify setup

type SuccessMessageCardProps = {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

const SuccessCard: React.FC<SuccessMessageCardProps> = ({
  title = 'This card already claimed by you',
  subtitle = 'The claiming is successfully.',
  buttonText = 'View your card collection',
  onButtonClick,
}) => (
  <Box
    sx={{
      textAlign: 'center',
      py: 4,
      px: 2,
      borderRadius: 2,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      minWidth: 400,
      margin: 'auto',
    }}
  >
    {/* Icon */}
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <Iconify icon="icon-park-outline:check-one" width={100} height={100} color="#3DC152" />
    </Box>

    {/* Title */}
    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
      {title}
    </Typography>

    {/* Subtitle */}
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
      {subtitle}
    </Typography>

    {/* Button */}
    <Button variant="outlined" size="large" onClick={onButtonClick}>
      {buttonText}
    </Button>
  </Box>
);

export default SuccessCard;
