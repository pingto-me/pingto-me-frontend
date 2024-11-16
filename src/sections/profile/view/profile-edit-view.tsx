'use client';

import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDeepEffect } from 'src/hooks/use-deep-effect';

import { fError } from 'src/utils/format-error';

import { LoadingScreen } from 'src/components/loading-screen';

import { IProfileItem, ProfileIconEnum, IProfileItemFormValue } from 'src/types/profile';

import ProfileNewEditForm from '../profile-new-edit-form';

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
  backgroundImage: 'https://picsum.photos/200',
  name: 'John Doe',
  position: 'Software Engineer',
  shortDescription: 'A passionate developer with experience in building scalable applications.',
  icon: ProfileIconEnum.SKILLS,
};

export default function ProfileEditView({ id }: Props) {
  const [currentValue, setCurrentValue] = useState<IProfileItem>();
  const initialize = useBoolean(true);
  const forceUpdate = useBoolean();
  const router = useRouter();

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
        <ProfileNewEditForm
          currentValue={currentValue}
          forceUpdate={forceUpdate.onToggle}
          submitCallback={onSubmit}
        />
      )}
    </Container>
  );
}
