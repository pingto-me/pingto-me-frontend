'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button, useTheme } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { fError } from 'src/utils/format-error';

import FormProvider from 'src/components/hook-form';
// import { CardProfile } from 'src/components/cards/card-profile';

import axios from 'axios';

import { localStorageGetItem } from 'src/utils/storage-available';

import { LOGIN_METHOD_STORAGE_KEY } from 'src/config-global';

import { LoginMethodEnum } from 'src/types/login-method.enum';
import { IProfileItem, ProfileIconEnum, IProfileItemFormValue } from 'src/types/profile';

import PaymentInfoCard from './components/paymentInfo-card';
import ConfigurationsCard from './components/configurations-form';
import PaymentWithBitkubButton from './components/payment-with-bitkub-button';

// ----------------------------------------------------------------------

type Props = {
  currentValue?: IProfileItem;
  type: string | null;
  forceUpdate: VoidFunction;
  submitCallback: (formValue: IProfileItemFormValue) => Promise<IProfileItem>;
  cardComponent?: any;
};

export default function PrintForm({
  currentValue,
  type,
  forceUpdate,
  submitCallback,
  cardComponent,
}: Props) {
  const theme = useTheme();
  const router = useRouter();

  const [price, setPrice] = useState<{} | null>(null);

  useEffect(() => {
    (async () => {
      // fetch price from https://convertticketprice-j3hdpkv3tq-uc.a.run.app/convertTicketPrice?eventId=ethglobal with axios

      const { data } = await axios.get(
        'https://convertticketprice-j3hdpkv3tq-uc.a.run.app/convertTicketPrice?eventId=ethglobal'
      );
      console.log(data);
      setPrice({
        eventId: 'ethglobal',
        usd: 5,
        kub: '2.049180',
        eth: '0.001573',
        btc: '0.000055',
      });
    })();
  }, []);

  const loginMethod = localStorageGetItem(LOGIN_METHOD_STORAGE_KEY) as LoginMethodEnum;

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
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    // if (!type) {
    //   router.replace(paths.root);
    // }
  }, [router, type]);

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
      <Stack textAlign="start" px={2} pt={3}>
        <Typography variant="h4" color="text.primary" sx={{ pb: 0.5 }}>
          Print to Card
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
          Review the information of your card before payment.
        </Typography>
      </Stack>

      <Grid container spacing={4} px={2} py={3}>
        <Grid xs={12} md={4}>
          <Typography variant="h6" color="text.secondary" sx={{ pb: 2 }}>
            Preview
          </Typography>
          {cardComponent}
        </Grid>
        {/*
        <Grid xs={12} md={8}>
          <Stack sx={{ mt: 3 }} spacing={3}>
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
        </Grid> */}

        <Grid xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Configurations
          </Typography>
          <ConfigurationsCard />
          {/* Header */}
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Payment Information
          </Typography>
          <PaymentInfoCard price={price} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
              mt: 3,
            }}
          >
            {/* Confirm and Create Order Button */}
            {/* <Button
              variant="contained"
              sx={{
                backgroundColor: '#212B36',
                color: '#FFFFFF',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1A222B',
                },
              }}
            >
              Confirm and Create order
            </Button> */}

            {loginMethod === LoginMethodEnum.BITKUBNEXT && <PaymentWithBitkubButton />}

            {/* Proceed Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8DF5C0',
                color: '#000000',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#7AE6B0',
                },
              }}
            >
              Proceed
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
