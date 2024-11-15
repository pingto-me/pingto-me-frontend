/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ToastProvider from 'src/components/toast';
import { StoreProvider } from 'src/store';
import LayoutPresence from 'src/components/animate/transitions/layout-presence';
import { PropsWithChildren } from 'react';
import { TonProvider } from 'src/auth/ton/context';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Callverz | Protect Your Privacy',
  description: 'Protect Your Privacy, Identify Calls with Confidence',
  keywords:
    'callverz,zero-knowledge,,zk,privacy,blockchain,call-identification,spam-protection,call-protection,call-verification,callverz-ai,ai',
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
        <ThemeProvider>
          <ToastProvider>
            <TonProvider>
              <StoreProvider>
                <MotionLazy>
                  <ProgressBar />
                  <LayoutPresence>{children}</LayoutPresence>
                </MotionLazy>
              </StoreProvider>
            </TonProvider>
            \
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
