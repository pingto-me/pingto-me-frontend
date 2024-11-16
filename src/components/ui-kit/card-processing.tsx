import React from 'react';

import { Box, Button, Typography, CircularProgress } from '@mui/material';

export type ProcessingCardProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

const ProcessingCard: React.FC<ProcessingCardProps> = ({
  title = 'Verification Processing',
  subtitle = 'Please sign the transaction.',
  buttonText = 'Cancel the verification process',
  onButtonClick,
}) => (
  <Box
    sx={{
      textAlign: 'center',
      py: 4,
      px: 3,
      borderRadius: 2,
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      minWidth: 400,
      margin: 'auto',
      backgroundColor: '#fff',
    }}
  >
    {/* Spinner */}
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 16px',
      }}
    >
      <CircularProgress size={60} thickness={5} sx={{ color: '#3DC152' }} />
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
    <Button
      variant="outlined"
      size="large"
      onClick={onButtonClick}
      sx={{ textTransform: 'none', fontWeight: 600 }}
    >
      {buttonText}
    </Button>
  </Box>
);

export default ProcessingCard;
