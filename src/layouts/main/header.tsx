import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter, usePathname } from 'src/routes/hooks';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';
import { useAppSelector } from 'src/store';

import Logo from 'src/components/logo';

import { HEADER } from '../config-layout';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { pageTitle } = useAppSelector((state) => state.page);

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            component="nav"
            direction="row"
            alignItems="center"
            spacing={5}
            sx={{ mr: 2.5, height: 1 }}
          >
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Dashboard
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Profile
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              NFTs
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Cards
            </Typography>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
