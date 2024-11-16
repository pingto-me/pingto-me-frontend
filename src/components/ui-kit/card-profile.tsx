import QRCode from 'react-qr-code';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import type { CardProps } from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';

import AvatarShape from 'src/assets/illustrations/avatar-shape';
import {
  GoIcon,
  ZodIcon,
  NestJsIcon,
  GitHubIcon,
  SolidityIcon,
  TypeScriptIcon,
} from 'src/assets/illustrations/tech-stack-icons';

import Image from '../image';
import CertifiedBadge from '../badges/certified-badge';

const _techStack = [
  {
    value: 'nestjs',
    label: 'NestJS',
  },
  {
    value: 'typescript',
    label: 'TypeScript',
  },
  {
    value: 'solidity',
    label: 'Solidity',
  },
  {
    value: 'github',
    label: 'GitHub',
  },
  {
    value: 'zod',
    label: 'Zod',
  },
  {
    value: 'go',
    label: 'Go',
  },
];

type User = {
  name?: string;
  imageProfile?: string;
  role?: string;
};

// ----------------------------------------------------------------------

type Props = CardProps & {
  user?: User;
  backgroundImage?: string;
  description?: string;
  linkQrcode?: string;
  certified?: boolean;
};

export function CardProfile({
  user,
  backgroundImage,
  description,
  linkQrcode,
  certified = true,
  sx,
  ...other
}: Props) {
  return (
    <Card sx={{ position: 'relative', textAlign: 'center', width: '328px', ...sx }} {...other}>
      {certified && (
        <Box sx={{ position: 'absolute', zIndex: 10, top: 10, right: 10 }}>
          <CertifiedBadge />
        </Box>
      )}
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt="avatar"
          src="/assets/images/avatar.png"
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <Image
          src="/assets/images/eth-bangkok.png"
          alt="eth"
          ratio="16/9"
          // slotProps={{
          //   overlay: {
          //     // bgcolor: (theme) => varAlpha(theme.vars.palette.common.blackChannel, 0.48),
          //   },
          // }}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={user?.name || 'Jayvion Simon'}
        secondary={user?.role || 'Blockchain Engineer'}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
        {_techStack.map((item) => (
          <IconButton key={item.label} color="inherit">
            {item.value === 'nestjs' && <NestJsIcon />}
            {item.value === 'typescript' && <TypeScriptIcon />}
            {item.value === 'solidity' && <SolidityIcon />}
            {item.value === 'github' && <GitHubIcon />}
            {item.value === 'zod' && <ZodIcon />}
            {item.value === 'go' && <GoIcon />}
          </IconButton>
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        {/* Text Section */}
        <Typography variant="body1" sx={{ flex: 1, mr: 2, textAlign: 'left' }}>
          {description ||
            `  I've cultivated skills across smart contract development, frontend and backend
          technologies, UX/UI design, and cybersecurity.`}
        </Typography>

        <QRCode value={linkQrcode || 'https://google.com'} size={60} />
      </Box>
    </Card>
  );
}
