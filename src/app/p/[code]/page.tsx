'use client';

import { Stack, Divider, Container } from '@mui/material';

import { CardProfile } from 'src/components/ui-kit/card-profile';

import ProfileEditView from 'src/sections/profile/view/profile-edit-view';

type Props = {
  params: {
    code: string;
  };
};

export default function Page({ params }: Props) {
  const { code } = params;
  return (
    <Container>
      <Stack pt={3} justifyContent="center" alignItems="center">
        <CardProfile />
      </Stack>

      <br />
      <Divider />
      <ProfileEditView id={code} />
    </Container>
  );
}
