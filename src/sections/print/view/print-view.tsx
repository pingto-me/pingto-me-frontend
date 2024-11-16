'use client';

import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDeepEffect } from 'src/hooks/use-deep-effect';

import { fError } from 'src/utils/format-error';

import { LoadingScreen } from 'src/components/loading-screen';
import { CardProfile } from 'src/components/ui-kit/card-profile';

import { IProfileItem, ProfileIconEnum, IProfileItemFormValue } from 'src/types/profile';

import PrintForm from '../print-form';

type Props = {
  id: string;
};

// TODO mock
const mockProfileItem: IProfileItem = {
  // CommonPayloadMetaData properties (assumed for the example)
  id: '12345', // Example ID from CommonPayloadMetaData
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  // ProfileItemFormValue properties
  profileImage: 'https://picsum.photos/200',
  backgroundImage: 'https://image.coinpedia.org/app_uploads/events/1718794499690d9dg2c2lwt.webp',
  name: 'Jayvion Simon',
  position: 'Blockchain Engineer',
  shortDescription: `I've cultivated skills across smart contract development, frontend and backend technologies, UX/UI design, and cybersecurity.`,
  icon: ProfileIconEnum.SKILLS,
};

export default function PrintView({ id }: Props) {
  const [currentValue, setCurrentValue] = useState<IProfileItem>();
  const initialize = useBoolean(true);
  const forceUpdate = useBoolean();
  const router = useRouter();

  const searchParams = useSearchParams();

  const type = searchParams.get('type');

  useDeepEffect(() => {
    (async () => {
      try {
        initialize.onTrue();
        // const profile = await getProfileApi(id);
        const profile = mockProfileItem;
        setCurrentValue(profile);
        initialize.onFalse();
      } catch (error) {
        const err = fError(error);
        enqueueSnackbar(err);
        router.replace(paths.root);
      }
    })();
  }, [id, forceUpdate.value]);

  const onSubmit = async (formValue: IProfileItemFormValue) => {
    try {
      // const resp = await createProfileApi(formValue);
      console.log(formValue);
      const resp = mockProfileItem;

      return resp;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      {initialize.value ? (
        <LoadingScreen sx={{ pt: 16 }} />
      ) : (
        <PrintForm
          currentValue={currentValue}
          type={type}
          forceUpdate={forceUpdate.onToggle}
          submitCallback={onSubmit}
          cardComponent={<CardProfile />}
        />
      )}
    </Container>
  );
}
