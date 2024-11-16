import * as Yup from 'yup';
import { capitalize } from 'lodash';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';
import { fError } from 'src/utils/format-error';

import Iconify from 'src/components/iconify';
import { CardProfile } from 'src/components/ui-kit/card-profile';
import { RHFUploadAvatar } from 'src/components/hook-form/rhf-upload';
import FormProvider, { RHFTextField, RHFRadioGroup } from 'src/components/hook-form';

import { IProfileItem, ProfileIconEnum, IProfileItemFormValue } from 'src/types/profile';

// ----------------------------------------------------------------------
// TODO mock
const bgImgMock = [
  'https://picsum.photos/200',
  'https://picsum.photos/210',
  'https://picsum.photos/220',
  'https://picsum.photos/230',
  'https://picsum.photos/240',
];
// ----------------------------------------------------------------------

type Props = {
  currentValue?: IProfileItem;
  forceUpdate: VoidFunction;
  submitCallback: (formValue: IProfileItemFormValue) => Promise<IProfileItem>;
};

export default function ProfileNewEditForm({ currentValue, forceUpdate, submitCallback }: Props) {
  const theme = useTheme();
  const YupSchema = Yup.object().shape({
    profileImage: Yup.mixed<any>(),
    backgroundImage: Yup.mixed<any>(),
    name: Yup.string().required('Name is required'),
    position: Yup.string().required('Position is required'),
    shortDescription: Yup.string(),
    icon: Yup.mixed<ProfileIconEnum>()
      .oneOf(Object.values(ProfileIconEnum), 'Invalid icon type')
      .required('Icon is required'),
  });

  console.log(currentValue);

  const defaultValues = useMemo(
    () => ({
      profileImage: currentValue?.profileImage,
      backgroundImage: currentValue?.backgroundImage,
      name: currentValue?.name || '',
      position: currentValue?.position || '',
      shortDescription: currentValue?.shortDescription || '',
      icon: currentValue?.icon || ProfileIconEnum.NONE, // Default to NONE if not provided
    }),
    [currentValue]
  );

  const methods = useForm({
    resolver: yupResolver(YupSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const currentBgImg = watch('backgroundImage');

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const formValue: IProfileItemFormValue = { ...data, photoURL: '' };

      // if (data.photoURL) {
      //   if (typeof data.photoURL === 'string') {
      //     formValue.photoURL = data.photoURL;
      //   } else {
      //     const fileUrl = await uploader(data.photoURL);
      //     formValue.photoURL = fileUrl;
      //   }
      // }
      await submitCallback(data);
      reset(data, { keepDirty: false });
      forceUpdate();
      enqueueSnackbar(currentValue ? 'Update success!' : 'Create success!', { variant: 'success' });
    } catch (error) {
      const err = fError(error);
      enqueueSnackbar(err);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profileImage', newFile, { shouldValidate: true, shouldDirty: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack textAlign="center" px={2} py={3}>
        <Typography variant="h4" color="text.primary" sx={{ pb: 2 }}>
          Your Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
          Update your profile to share to the public.
        </Typography>
      </Stack>

      <Grid container spacing={6} px={2} py={3}>
        <Grid xs={12} md={8}>
          <Box sx={{ mb: 5 }}>
            <RHFUploadAvatar
              name="profileImage"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>

          <Stack sx={{ mt: 3 }} spacing={3}>
            <Stack direction="row" flexWrap="wrap" spacing={2}>
              {bgImgMock.map((item, index) => (
                <Avatar
                  key={index}
                  src={item}
                  sx={{
                    borderRadius: 1,
                    height: 64,
                    width: 64,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    '&:hover': {
                      outline: `2px solid ${theme.palette.primary.light}`,
                    },
                    // TODO change condition later
                    ...(item === currentBgImg && {
                      outline: `2px solid ${theme.palette.primary.main}`,
                    }),
                  }}
                />
              ))}
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  borderRadius: 1,
                  height: 64,
                  width: 64,
                  bgcolor: '#919EAB14',
                  border: '1px dashed #919EAB33',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': {
                    bgcolor: '#919eab39',
                    border: '1px dashed #919eab4d',
                  },
                }}
              >
                <Iconify
                  icon="eva:cloud-upload-fill"
                  width={28}
                  height={28}
                  sx={{ color: '#919EAB' }}
                />
              </Stack>
            </Stack>

            <RHFTextField name="name" label="Name" placeholder="Enter name.." />
            <RHFTextField name="position" label="Position" placeholder="Enter position.." />

            <RHFTextField
              sx={{ '& .MuiInputBase-colorPrimary': { height: 'auto !important' } }}
              name="shortDescription"
              label="Short Description"
              placeholder="Enter short description.."
              multiline
              rows={3}
            />

            <RHFRadioGroup
              row
              name="icon"
              label="Icon"
              spacing={4}
              options={[
                {
                  value: ProfileIconEnum.BADGES,
                  label: capitalize(ProfileIconEnum.BADGES),
                },
                {
                  value: ProfileIconEnum.SKILLS,
                  label: capitalize(ProfileIconEnum.SKILLS),
                },
                {
                  value: ProfileIconEnum.NONE,
                  label: capitalize(ProfileIconEnum.NONE),
                },
              ]}
            />
          </Stack>

          <Stack alignItems="flex-start" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isDirty}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Typography variant="h6" color="text.secondary" sx={{ pb: 2 }}>
            Preview
          </Typography>
          {/* <Card sx={{ py: 24, px: 3 }}>Preview card</Card> */}
          <CardProfile />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
