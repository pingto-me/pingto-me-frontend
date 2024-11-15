import { PropsWithChildren } from 'react';

import { SxProps } from '@mui/material/styles';

import LoadingScreen from './loading-screen';

type Props = {
  loading: boolean;
  sx?: SxProps;
};

export default function LoadingWrapper({ loading, sx, children }: PropsWithChildren<Props>) {
  if (loading) return <LoadingScreen sx={sx} />;

  return children;
}
