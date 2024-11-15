import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter, usePathname } from 'src/routes/hooks';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { iconSrc } from 'src/utils/icon';

import { bgBlur } from 'src/theme/css';
import { useAppSelector } from 'src/store';

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
        <Container
          maxWidth="xs"
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {pathname !== '/dashboard/' && (
            <>
              <Box sx={{ width: 50 }}>
                <IconButton onClick={() => router.back()} sx={{ px: 0 }}>
                  <Box component="img" src={iconSrc('ic_arrow_left')} />
                </IconButton>
              </Box>
              <Typography fontWeight={700}>{pageTitle}</Typography>

              <Box sx={{ width: 50 }} />
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}
