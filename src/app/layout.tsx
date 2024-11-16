/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ToastProvider from 'src/components/toast';
import { StoreProvider } from 'src/store';
import { PropsWithChildren } from 'react';
import { AuthProvider } from 'src/auth/context';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'pingto.me',
  description: 'pingto.me',
  keywords: 'pingto.me',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        {/* <DynamicProvider> */}
        <ThemeProvider>
          <ToastProvider>
            <StoreProvider>
              <AuthProvider>
                <MotionLazy>
                  <ProgressBar />
                  {children}
                </MotionLazy>
              </AuthProvider>
            </StoreProvider>
          </ToastProvider>
        </ThemeProvider>
        {/* </DynamicProvider> */}
      </body>
    </html>
  );
}
