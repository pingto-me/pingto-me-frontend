import { GuestGuard } from 'src/auth/guard';

import LoginView from 'src/sections/login/view/login-view';

export default function Page() {
  return (
    <GuestGuard>
      <LoginView />
    </GuestGuard>
  );
}
