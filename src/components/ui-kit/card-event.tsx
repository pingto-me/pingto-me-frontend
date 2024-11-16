import React from 'react';
import QRCode from 'react-qr-code';

import { Box, Card, Divider, Typography } from '@mui/material';

import ethBangkok from 'src/assets/images/eth-bangkok.png';

import Image from '../image';
import CertifiedBadge from '../badges/certified-badge';

type Props = {
  title?: string;
  subtitle?: string;
  eventDate?: string;
  description?: string;
  qrCodeValue?: string;
  certified?: boolean;
};

export const EventCard: React.FC<Props> = ({
  title = 'ETHGlobal BANGKOK',
  subtitle = 'November 15 – 17, 2024',
  eventDate = 'Bangkok, Thailand',
  description = 'Claim this card by scanning this QR code after that it will show your profile when scanned.',
  qrCodeValue = 'https://ping.to.me',
  certified = true,
}) => (
  <Card
    sx={{
      position: 'relative',
      width: '400px',
      borderRadius: 2,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: '#000',
      color: '#fff',
      py: 2,
    }}
  >
    {/* Certified Badge */}
    {certified && (
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <CertifiedBadge />
      </Box>
    )}
    <Box
      sx={{
        position: 'relative',
        minHeight: '460px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image src={ethBangkok.src} alt="eth" ratio="16/9" />
      <Box sx={{ position: 'absolute', bottom: 0, right: 16, zIndex: 10 }}>
        <Box component="img" src="/assets/logos/PINGTOME-WHITE.svg" sx={{ color: '#fff' }} />
        <Typography variant="body2" sx={{ textAlign: 'right', color: '#fff' }}>
          pingto.me
        </Typography>
      </Box>
    </Box>

    {/* Divider */}
    <Divider sx={{ borderStyle: 'dashed', borderColor: '#555', my: 2 }} />

    {/* QR Code Section */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        gap: 1,
        mt: 1,
        textAlign: 'left',
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <QRCode value={qrCodeValue} size={50} fgColor="#000" bgColor="#D4AF37" />
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'left', color: '#fff' }}>
        {description}
      </Typography>
    </Box>
  </Card>
);
