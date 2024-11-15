import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.common.black, 0.6),
          backdropFilter: 'blur(8px)',
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
