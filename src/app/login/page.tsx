import dynamic from 'next/dynamic';

import { GuestGuard } from 'src/auth/guard';

const LoginView = dynamic(() => import('src/sections/login/view/login-view'), {
  ssr: false,
});

export default function Page() {
  return (
    <GuestGuard>
      <LoginView />
    </GuestGuard>
  );
}
