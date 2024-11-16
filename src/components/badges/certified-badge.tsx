import React from 'react';

import { Box, Typography } from '@mui/material';

import Iconify from '../iconify';

const CertifiedBadge: React.FC = () => (
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '30px',
      backgroundColor: '#000',
      width: 150,
      height: 40,
      padding: '5px 15px',
      border: '3px solid #8df5c0',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      color: '#fff',
      gap: '8px',
    }}
  >
    {/* Icon */}
    <Box
      sx={{
        position: 'absolute',
        minWidth: 45,
        minHeight: 45,
        borderRadius: '50%',
        backgroundColor: '#8df5c0',
        border: '3px solid #82F2CB',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: -2,
      }}
    >
      <Iconify icon="iconamoon:check-bold" sx={{ color: '#fff', width: '100%', height: '100%' }} />
    </Box>

    {/* Text */}
    <Box sx={{ marginLeft: '34px', textAlign: 'center' }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '-10px',
        }}
      >
        CERTIFIED
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 400,
          fontSize: '12px',
        }}
      >
        BY PINGTOME
      </Typography>
    </Box>
  </Box>
);

export default CertifiedBadge;
