'use client';

import { Grid, Stack, Button, Container, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { localStorageGetItem } from 'src/utils/storage-available';

import { useAuthContext } from 'src/auth/hooks';
import { LOGIN_METHOD_STORAGE_KEY } from 'src/config-global';

export default function DashboardView() {
  const { disconnect } = useAuthContext();

  const loginMethod = localStorageGetItem(LOGIN_METHOD_STORAGE_KEY);

  const infos = [
    {
      title: 'Update Your Profile',
      description: `Create your unique profile with all the links and information you want to share.`,
      button: 'Update Your Profile',
      path: '/profile',
    },
    {
      title: 'Print Your Profile to Card',
      description: `Embed your profile into an NFC card, making it easy to share your digital identity with just a tap.`,
      button: 'Print Your Profile',
      path: '/',
    },
    {
      title: 'Print Your NFT to Card',
      description: `Carry your favorite NFTs wherever you go and share them with others in a tangible way.`,
      button: 'Print your NFT',
      path: '/',
    },
  ];

  const renderCard = (info: any) => (
    <Stack>
      <Typography variant="h5">{info.title}</Typography>
      <Typography variant="body2">{info.description}</Typography>
      <Button
        component={RouterLink}
        href={info.path}
        variant="contained"
        color="inherit"
        size="large"
      >
        {info.button}
      </Button>
    </Stack>
  );

  return (
    <Container>
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h5">Dashboard</Typography>
          <Typography variant="body2">
            {`Your digital identity starts here. With PingTo.me,
            you can create, share, and even immortalize your profile on NFC cards—taking your online presence into the real world.
            Why PingTo.me? At PingTo.me, we believe in making your connections truly yours. Whether it’s your social links, portfolio,
            or business contact info, we help you bring it all together in a single, dynamic profile. But that’s not all—we go beyond
            the digital world to offer something tangible and secure. Bring Your Profile to Life With PingTo.me, your digital profile
            isn’t just an online link. It’s also a physical NFC card that you can carry with you and share effortlessly. Here's how it works:`}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {infos.map((info, index) => (
            <Grid item xs={4} key={index}>
              {renderCard(info)}
            </Grid>
          ))}
        </Grid>
      </Stack>

      <br />
      <br />
      <Stack spacing={3} pb={3}>
        connect with {loginMethod}
        <button type="button" onClick={() => disconnect()}>
          disconnect
        </button>
      </Stack>
    </Container>
  );
}
