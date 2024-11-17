'use client';

import Link from 'next/link';
import { ethers } from 'ethers';
import { SupportChat } from '@pushprotocol/uiweb';
import { useState, useEffect, useCallback } from 'react';

import { Box, Grid, Chip, Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { redeemCard, getCardByCode } from 'src/rest-apis/card';

import Iconify from 'src/components/iconify';
import { CardNFT } from 'src/components/ui-kit/card-nft';
import SuccessCard from 'src/components/ui-kit/card-success';
import { EventCard } from 'src/components/ui-kit/card-event';
import { CardProfile } from 'src/components/ui-kit/card-profile';
import ProcessingCard from 'src/components/ui-kit/card-processing';
import { useProcessingModal } from 'src/components/modals/processing-modal';

import { Card } from 'src/types/card';

type Props = {
  params: {
    code: string;
  };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const { code } = params;
  const [data, setData] = useState<Card | null>(null);
  const { openModal, closeModal } = useProcessingModal();
  const [isRedeemed, setIsRedeemed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signer = ethers.Wallet.createRandom();

  const handleProcess = () => {
    openModal({
      title: 'Claiming Processing',
      subtitle: 'Please wait a moment.',
      onButtonClick: closeModal,
    });
  };

  const fetchCardCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getCardByCode(code);
      console.log('fetchCardcode', res);
      if (res) setData(res);
    } catch (error) {
      console.log(error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  const onRedeemCard = async () => {
    handleProcess();
    try {
      const res = await redeemCard(code);
      console.log('onRedeemCard', res);
      if (res) {
        setData(res);
        if (res?.event?.eventType !== 'event') setIsRedeemed(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  };

  useEffect(() => {
    fetchCardCode();
  }, [fetchCardCode]);

  const renderCard = () => {
    if (data?.event?.eventType === 'event') {
      if (!data?.isRedeemed) {
        return (
          <Box sx={{ mb: 4 }}>
            <EventCard qrCodeValue={data?.code} />
          </Box>
        );
      }
      return (
        <Grid
          sx={{ mb: 4 }}
          container
          spacing={3}
          pt={3}
          justifyContent="center"
          alignItems="center"
        >
          {/* CardNFT */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <EventCard qrCodeValue={data?.code} />
          </Grid>

          {/* CardProfile */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <CardProfile user={data?.profile} qrCodeValue={data?.code} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Box sx={{ mb: 4 }}>
        <CardNFT />
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ProcessingCard
          isCard={false}
          isScreenLoading
          subtitle="Redirecting you to a card you have scanned, please wait."
          title="Loading..."
        />
        ;
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">Card not found</Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => router.push(paths.root)}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  if (isRedeemed && data?.event?.eventType !== 'event') {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SuccessCard
          title="This card already claimed by you"
          subtitle="The claiming is successfully."
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F9FAFB', // Light background
        px: 3,
        py: 4,
      }}
    >
      {/* Header Section */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
        Claim this card
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        You are about to claim this card and add it to your account.
      </Typography>

      {/* CardNFT Component */}

      {renderCard()}

      {/* Claim Button */}
      {!data?.isRedeemed ? (
        <Button
          disabled={data?.isRedeemed}
          variant="contained"
          onClick={() => onRedeemCard()}
          sx={{
            backgroundColor: '#8DF5C0',
            color: '#000',
            textTransform: 'none',
            fontSize: '16px',
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#7AE6B0',
            },
          }}
        >
          Claim this card
        </Button>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mt: 4,
          }}
        >
          {/* Pinging Status */}
          <Chip
            label="9.8k pinged"
            color="default"
            sx={{
              cursor: 'pointer',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 500,
              mb: 2,
              px: 1.5,
            }}
          />

          <Stack spacing={3} direction="row">
            {/* Ping Button */}
            <Button
              variant="outlined"
              sx={{
                borderColor: '#d3d3d3',
                color: '#000',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '16px',
                px: 4,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  borderColor: '#b3b3b3',
                },
              }}
            >
              <Iconify icon="fluent:flash-24-filled" width={20} height={20} />
              Ping the cards
            </Button>

            <Button
              component={Link}
              href="https://testnet-scan.sign.global/attestation/onchain_evm_84532_0xda5"
              target="_blank"
              variant="outlined"
              sx={{
                borderColor: '#d3d3d3',
                color: '#000',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '16px',
                px: 4,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  borderColor: '#b3b3b3',
                },
              }}
            >
              <Iconify icon="mingcute:certificate-fill" width={20} height={20} />
              Certificate
            </Button>
          </Stack>

          {/* Description */}
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
            Don’t worry, ping is just saying hi to the cards
          </Typography>
        </Box>
      )}

      {/* <ChatUIProvider>
        <ChatView
          chatId="a1514e2ef8c3e26e9c9dc277a977ff073405b352e1a4c82e51ad56d4ceb0cc7c"
          limit={10}
          verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
          isConnected
        />
      </ChatUIProvider> */}

      <SupportChat
        supportAddress="0x13Ac5b9d3EF71Ebf02eD5EDF82Fa5EecfD06532a" // support address, this belongs to you
        signer={signer}
      />
    </Box>
  );
}
