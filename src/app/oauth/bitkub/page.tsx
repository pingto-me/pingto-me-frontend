'use client';

import { useEffect } from 'react';

import { bitkubNextSdk } from 'src/utils/bitkub-next';

import { setSession } from 'src/auth/context/utils';

import { LoadingScreen } from 'src/components/loading-screen';

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
        // const userInfo = await bitkubNextSdk.getUserInfo();

        // console.log('userInfo', userInfo.username);

        // const { data } = await axios.post('/api/auth/login', {
        //   email: 'demo@minimals.cc',
        //   password: 'demo1234',
        // });
        // console.log({ data });

        // const { accessToken } = data;
        // setSession(accessToken, LoginMethodEnum.BITKUBNEXT);

        window.close();
      }
    } catch (error) {
      console.log(error);
      setSession(null, null);
      // bitkubNextSdk.logout();
      alert('Login failed');
    }
  };

  return <LoadingScreen />;
}
