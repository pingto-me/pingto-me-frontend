'use client';

import { Stack, Container } from '@mui/material';

import { CardProfile } from 'src/components/ui-kit/card-profile';

type Props = {
  params: {
    code1: string;
  };
};

export default function Page({ params }: Props) {
  const { code1 } = params;
  return (
    <Container>
      <Stack pt={3} justifyContent="center" alignItems="center">
        <CardProfile />
      </Stack>
    </Container>
  );
}
