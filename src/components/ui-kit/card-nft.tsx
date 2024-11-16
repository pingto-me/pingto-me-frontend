import QRCode from 'react-qr-code';

import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { CardProps } from '@mui/material/Card';

import DefaultNFT from 'src/assets/images/bg-nft.png';

import Image from '../image';
import CertifiedBadge from '../badges/certified-badge';

// ----------------------------------------------------------------------

type Props = CardProps & {
  backgroundImage?: string;
  description?: string;
  linkQrcode?: string;
  certified?: boolean;
  standard?: string;
  tokenId?: string;
  isExpand?: boolean;
};

export function CardNFT({
  backgroundImage,
  description,
  linkQrcode,
  certified = true,
  isExpand = true,
  standard,
  tokenId,
  sx,
  ...other
}: Props) {
  return (
    <Card
      sx={{ position: 'relative', textAlign: 'center', width: '328px', p: 1, ...sx }}
      {...other}
    >
      {certified && (
        <Box sx={{ position: 'absolute', zIndex: 10, top: 20, right: 20 }}>
          <CertifiedBadge />
        </Box>
      )}
      <Box sx={{ position: 'relative' }}>
        <Image
          sx={{
            borderRadius: '12px',
          }}
          src={DefaultNFT.src}
          alt="eth"
          ratio={isExpand ? '3/4' : '16/9'}
        />
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

      <Box sx={{ px: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={standard || 'ERC-721'}
            variant="outlined"
            size="small"
            sx={{ bgColor: 'rgba(145, 158, 171, 0.08)', color: '#637381' }}
          />
          <Chip
            label={`${tokenId || 'bitkub chain'}`}
            variant="outlined"
            size="small"
            sx={{ bgColor: 'rgba(145, 158, 171, 0.08)', color: '#637381' }}
          />
          <Chip
            label={`Token ID #${tokenId || '44449'}`}
            variant="outlined"
            size="small"
            sx={{ bgColor: 'rgba(145, 158, 171, 0.08)', color: '#637381' }}
          />
        </Stack>
        <Typography variant="h6" component="div" textAlign="left" gutterBottom>
          Data Science with R
        </Typography>

        {isExpand && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '4fr 1fr',
              gap: 2,
              mt: 1,
              textAlign: 'left',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">
                  Owner account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Owner Address
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  NFT Collection
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" color="text.secondary">
                  Jayvion Simon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  0x66d7...549b
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  0xA51b...2a95
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <QRCode value={linkQrcode || 'https://google.com'} size={50} />
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}
