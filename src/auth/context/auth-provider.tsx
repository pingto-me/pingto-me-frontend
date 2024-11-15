'use client';

import { useRef, useMemo, useState, useCallback, PropsWithChildren } from 'react';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDeepEffect } from 'src/hooks/use-deep-effect';

import axios from 'src/utils/axios';
import { sleep } from 'src/utils/sleep';
import { bitkubNextSdk } from 'src/utils/bitkub-next';
import { localStorageGetItem } from 'src/utils/storage-available';

import { ACCESS_TOKEN_STORAGE_KEY, LOGIN_METHOD_STORAGE_KEY } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { LoginMethodEnum } from 'src/types/login-method.enum';

import AuthContext from './auth-context';
import { AuthContextType } from '../types';
import { setSession, isValidToken } from './utils';

export default function AuthProvider({ children }: PropsWithChildren) {
  // state
  const loading = useBoolean(true);
  const logingOut = useBoolean(false);
  const [userState, setUserState] = useState<any | null>(null);

  // interval
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorageGetItem(ACCESS_TOKEN_STORAGE_KEY);
      const loginMethod = localStorageGetItem(LOGIN_METHOD_STORAGE_KEY) as LoginMethodEnum;

      console.log({ accessToken });

      if (accessToken && isValidToken(accessToken)) {
        loading.onTrue();
        setSession(accessToken, loginMethod);

        const { data } = await axios.get('/api/auth/me');
        const { user } = data;

        setUserState(user);
        loading.onFalse();
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      } else {
        setUserState(null);
        loading.onFalse();
      }
    } catch (error) {
      console.error(error);
      setUserState(null);

      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  }, [loading]);

  useDeepEffect(() => {
    interval.current = setInterval(() => {
      initialize();
    }, 2000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  const connect = useCallback(async () => {}, []);

  const disconnect = useCallback(async () => {
    logingOut.onTrue();
    const loginMethod = localStorageGetItem(LOGIN_METHOD_STORAGE_KEY) as LoginMethodEnum;

    if (loginMethod === LoginMethodEnum.BITKUBNEXT) {
      await bitkubNextSdk.logout();
    }

    setSession(null, null);
    setUserState(null);

    window.location.reload();
    await sleep(500);
    logingOut.onFalse();
  }, [logingOut]);

  const checkAuthenticated = userState ? 'authenticated' : 'unauthenticated';

  const memoizedValue: AuthContextType = useMemo(
    () => ({
      user: userState,
      loading: loading.value,
      authenticated: checkAuthenticated === 'authenticated',
      unauthenticated: checkAuthenticated === 'unauthenticated',
      //
      connect,
      disconnect,
    }),
    [userState, loading.value, checkAuthenticated, connect, disconnect]
  );

  if (logingOut.value) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
