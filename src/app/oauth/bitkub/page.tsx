'use client';

import { useEffect } from 'react';

import axios from 'src/utils/axios';
import { bitkubNextSdk } from 'src/utils/bitkub-next';

import { setSession } from 'src/auth/context/utils';

import { LoadingScreen } from 'src/components/loading-screen';

import { LoginMethodEnum } from 'src/types/login-method.enum';

export default function Page() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      exchange(code);
    }
  }, []);

  const exchange = async (code: string) => {
    try {
      await bitkubNextSdk.exchangeAuthorizationCode(code);
      console.log({ code });

      // TODO - process the code with backend + set session
      if (code) {
        const { data } = await axios.post('/api/auth/login', {
          email: 'demo@minimals.cc',
          password: 'demo1234',
        });
        console.log({ data });

        const { accessToken } = data;
        setSession(accessToken, LoginMethodEnum.BITKUBNEXT);
        alert('Login success');
        window.close();
      }
    } catch (error) {
      console.log(error);
      setSession(null, null);
      bitkubNextSdk.logout();
      alert('Login failed');
    }
  };

  return <LoadingScreen />;
}
