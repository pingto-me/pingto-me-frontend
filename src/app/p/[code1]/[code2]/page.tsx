'use client';

import { Stack, Container } from '@mui/material';

import { CardNFT } from 'src/components/ui-kit/card-nft';
import { CardProfile } from 'src/components/ui-kit/card-profile';

type Props = {
  params: {
    code1: string;
    code2: string;
  };
};

export default function Page({ params }: Props) {
  const { code1, code2 } = params;
  return (
    <Container>
      <Stack direction="row" pt={3} spacing={3} justifyContent="center" alignItems="center">
        <CardNFT />
        <CardProfile sx={{ height: 582 }} />
      </Stack>
    </Container>
  );
}
