import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { List, Menu, Stack, Button, Avatar, MenuItem, ListItemButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { HEADER } from '../config-layout';

// ----------------------------------------------------------------------
const options = [
  {
    value: 'sign-out',
    label: 'Sign out',
    icon: <Iconify icon="material-symbols:logout" />,
  },
];

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const router = useRouter();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const { user } = useAuthContext();
  const { disconnect } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const navItems = [
    { label: 'Dashboard', path: paths.dashboard },
    { label: 'Profile', path: `/p/${1234}` },
    { label: 'NFTs', path: '/nft-gallory' },
    { label: 'Cards', path: '/card' },
    { label: 'World', path: '/world' },
  ];

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
    index: number
  ) => {
    if (value === 'sign-out') {
      handleLogout();
    }

    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    disconnect();
  };

  const handleRedirect = (path: string) => {
    router.push(path);
  };

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

          <Stack component="nav" direction="row" alignItems="center" spacing={2} sx={{ height: 1 }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="text"
                sx={{ color: 'text.primary' }}
                onClick={() => handleRedirect(item.path)}
              >
                {item.label}
              </Button>
            ))}

            <Box>
              <List component="nav" sx={{ px: 0 }}>
                <ListItemButton
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickListItem}
                  sx={{ borderRadius: 1 }}
                >
                  <Avatar alt={user?.id || ''} sx={{ width: 32, height: 32 }}>
                    {/* TODO change it later */}
                    {user?.id?.charAt(0).toUpperCase()}
                  </Avatar>

                  {/* <ListItemText
                    primary={user?.displayName || ''}
                    secondary={user?.email || ''}
                    primaryTypographyProps={{
                      typography: 'xsSemiBold',
                      color: 'text.secondary',
                    }}
                    secondaryTypographyProps={{
                      component: 'span',
                      typography: 'baseRegular',
                      color: 'text.tertiary',
                    }}
                  /> */}

                  {/* <Iconify icon="mingcute:down-line" sx={{ ml: 2 }} /> */}
                </ListItemButton>
              </List>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'user-button',
                  role: 'listbox',
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={index}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, option.value, index)}
                  >
                    <Stack
                      direction="row"
                      minWidth={180}
                      spacing={1}
                      alignItems="center"
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        ...(option.value === 'sign-out' && {
                          color: theme.palette.error.light,
                        }),
                      }}
                    >
                      {option.icon} {option.label}
                    </Stack>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
