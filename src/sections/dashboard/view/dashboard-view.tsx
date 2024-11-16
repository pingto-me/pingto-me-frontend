'use client';

import { Grid, Stack, Button, Divider, Container, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

export default function DashboardView() {
  // const logUser = async () => {
  //   const userInfo = await bitkubNextSdk.getUserInfo();
  //   const balance = await bitkubNextSdk.getBalanceNative();
  //   console.log({ userInfo, balance });
  // };

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
      path: '/print-profile',
    },
    {
      title: 'Print Your NFT to Card',
      description: `Carry your favorite NFTs wherever you go and share them with others in a tangible way.`,
      button: 'Print your NFT',
      path: '/print-nft',
    },
  ];

  const renderCard = (info: any) => (
    <Stack spacing={2}>
      <Typography variant="h6" fontWeight="bold">
        {info.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {info.description}
      </Typography>
      <Button
        component={RouterLink}
        href={info.path}
        variant="contained"
        color="inherit"
        size="large"
        sx={{
          borderRadius: 1,
          fontWeight: 'bold',
          maxWidth: 180,
        }}
      >
        {info.button}
      </Button>
    </Stack>
  );

  return (
    <Container maxWidth="lg">
      <Stack
        spacing={4}
        sx={{
          mt: 3,
        }}
      >
        {/* Header Section */}
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="inherit" color="text.secondary" paragraph>
            {`Your digital identity starts here. With PingTo.me, you can create, share, and even immortalize your profile on NFC cards—taking your online presence into the real world. Why PingTo.me? At PingTo.me, we believe in making your connections truly yours. Whether it’s your social links, portfolio, or business contact info, we help you bring it all together in a single, dynamic profile. But that’s not all—we go beyond the digital world to offer something tangible and secure. Bring Your Profile to Life With PingTo.me, your digital profile isn’t just an online link. It’s also a physical NFC card that you can carry with you and share effortlessly. Here's how it works:`}
          </Typography>
        </Stack>

        {/* Divider */}
        <Divider />

        {/* Cards Section */}
        <Grid container spacing={4}>
          {infos.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              {renderCard(info)}
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
