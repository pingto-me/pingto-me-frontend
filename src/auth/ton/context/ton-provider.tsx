'use client';

import { useRef, useMemo, useState, useCallback, PropsWithChildren } from 'react';
import {
  useTonWallet,
  useTonConnectUI,
  TonConnectUIProvider,
  useIsConnectionRestored,
  ConnectAdditionalRequest,
} from '@tonconnect/ui-react';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDeepEffect } from 'src/hooks/use-deep-effect';

import { toastError } from 'src/utils/format-error';

import { getProfileApi } from 'src/rest-apis/user';
import { ACCESS_TOKEN_STORAGE_KEY } from 'src/config-global';
import { checkProofApi, generateProofPayloadApi } from 'src/rest-apis/ton-auth';

import { setSession } from './utils';
import TonContext from './ton-context';
import { TonContextType } from '../types';

const payloadTTLMS = 1000 * 60 * 20;

export default function TonProvider({ children }: PropsWithChildren) {
  // ton
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const isConnectionRestored = useIsConnectionRestored();

  // interval
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();

  // state
  const loading = useBoolean(true);
  const [userState, setUserState] = useState<any | null>(null);

  useDeepEffect(() => {
    (async () => {
      try {
        if (!isConnectionRestored) {
          return;
        }

        clearInterval(interval.current);

        if (!wallet) {
          disconnect();
          const generateProofPayload = async () => {
            tonConnectUI.setConnectRequestParameters({ state: 'loading' });
            const payload = await generateProofPayloadApi();

            if (payload) {
              const proofPayload: ConnectAdditionalRequest = {
                tonProof: payload,
              };
              tonConnectUI.setConnectRequestParameters({ state: 'ready', value: proofPayload });
              loading.onFalse();
            } else {
              tonConnectUI.setConnectRequestParameters(null);
            }
          };

          generateProofPayload();
          setInterval(generateProofPayload, payloadTTLMS);
          return;
        }

        const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

        if (token) {
          setSession(token);
          const user = await getProfileApi();

          setUserState(user);
          loading.onFalse();
          return;
        }

        const { connectItems, account } = wallet;

        if (connectItems?.tonProof && 'proof' in connectItems.tonProof) {
          const { tokens, user } = await checkProofApi(connectItems.tonProof.proof, account);
          setSession(tokens.accessToken);
          setUserState(user);
        } else {
          disconnect();
        }
      } catch (error) {
        toastError(error);
        disconnect();
      }
    })();
  }, [wallet, isConnectionRestored]);

  const refresh = useCallback(async () => {
    try {
      const user = await getProfileApi();
      setUserState(user);
    } catch (error) {
      toastError(error);
    }
  }, []);

  const connect = useCallback(async () => {
    tonConnectUI.openModal();
  }, [tonConnectUI]);

  const disconnect = useCallback(() => {
    setSession(null);
    setUserState(null);
    if (wallet) {
      tonConnectUI.disconnect();
    }
  }, [tonConnectUI, wallet]);

  const checkAuthenticated = userState ? 'authenticated' : 'unauthenticated';

  const memoizedValue: TonContextType = useMemo(
    () => ({
      user: userState,
      loading: loading.value,
      authenticated: checkAuthenticated === 'authenticated',
      unauthenticated: checkAuthenticated === 'unauthenticated',
      //
      refresh,
      connect,
      disconnect,
    }),
    [userState, loading.value, checkAuthenticated, refresh, connect, disconnect]
  );

  return (
    <TonConnectUIProvider manifestUrl={process.env.NEXT_PUBLIC_TON_MANIFAST_URL}>
      <TonContext.Provider value={memoizedValue}>{children}</TonContext.Provider>
    </TonConnectUIProvider>
  );
}
