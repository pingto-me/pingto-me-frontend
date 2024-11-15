'use client';

import { useMemo } from 'react';
import merge from 'lodash/merge';

import CssBaseline from '@mui/material/CssBaseline';
import {
  alpha,
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

// system
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
// options
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createContrast } from './options/contrast';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const contrast = createContrast('default', 'light');

  const customPalette = palette('light');

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...customPalette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows('light'),
        primary: `0 8px 16px 0 ${alpha(`${customPalette.primary.main}`, 0.24)}`,
      },
      direction: 'ltr',
      shadows: shadows('light'),
      shape: { borderRadius: 12 },
      typography,
    }),
    [contrast.palette, customPalette]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
