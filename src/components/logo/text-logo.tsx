import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

export default function TextLogo({ disabledLink, sx }: LogoProps) {
  const logo = (
    <Box sx={{ display: 'inline-flex', cursor: 'pointer', ...sx }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: (theme) => theme.typography.fontSecondaryFamily,
          color: '#FFFFFF',
        }}
      >
        CALL
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontFamily: (theme) => theme.typography.fontSecondaryFamily,
          color: 'primary.main',
        }}
      >
        VERZ
      </Typography>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
}
