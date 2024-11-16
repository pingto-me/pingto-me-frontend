'use client';

import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Divider, Container, Typography } from '@mui/material';

import { bitkubNextSdk } from '../../../utils/bitkub-next';

export default function PaymentWithBitkubView() {
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const [proceedLoading, setProceedLoading] = useState(false);
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTcwMmE2MC0yNWNmLTRlYTYtODI5Yi05YzQyZDZiMmI5NTAiLCJpYXQiOjE3MzE3NjkwNzUsImV4cCI6MTczMjM3Mzg3NX0._nZzaBZhPwJ__seypPvytc7T-7JIBsipuZ3g9ZCN4b8';

  useEffect(() => {
    logUser();
  }, []);
  const logUser = async () => {
    try {
      const userInfo = await bitkubNextSdk.getUserInfo();
      const balance = await bitkubNextSdk.getBalanceNative();
      console.log({ userInfo, balance });
    } catch (error) {
      console.error('Error fetching user info or balance:', error);
    }
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ eventId: 'MMRrQlxjYUo4lG1iz3jD' }),
      });
      const data = await response.json();
      setOrderResponse(data);
      setOrderCreated(true);
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  const handleProceedToPay = async () => {
    setProceedLoading(true);
    try {
      const toAddress = '0x8962DFafe0Ed6c3801BbbD8196D1156b5e97351a';
      const tokenAddress = '0x37f57Ae5c5662191a5d87d94C8A8445Ee2e2AbA7';
      const amount = ethers.utils.parseUnits('0.01', 'ether').toString();
      await bitkubNextSdk.approveToken(
        tokenAddress,
        ethers.utils.parseUnits('1', 'ether').toString()
      );
      const result = await bitkubNextSdk.transfer20(tokenAddress, toAddress, amount);
      console.log('Transaction Result:', result);
    } catch (error) {
      console.error('Error during payment:', error);
    } finally {
      setTimeout(() => {
        setProceedLoading(false);
      }, 8000);
    }
  };

  const price = 5; // Price in USD

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
            Payment with Bitkub NEXT
          </Typography>
          <Typography variant="h6">Price: ${price} USD</Typography>
        </Stack>

        {/* Divider */}
        <Divider />

        {/* Buttons Row */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
          }}
        >
          {!orderCreated && (
            <LoadingButton
              variant="contained"
              color="inherit"
              size="large"
              onClick={handleCreateOrder}
              loading={loading}
              sx={{
                borderRadius: 1,
                fontWeight: 'bold',
                maxWidth: 220,
              }}
            >
              Confirm and Create Order
            </LoadingButton>
          )}

          {orderCreated && (
            <LoadingButton
              variant="contained"
              color="primary"
              size="large"
              onClick={handleProceedToPay}
              loading={proceedLoading}
              sx={{
                borderRadius: 1,
                fontWeight: 'bold',
                maxWidth: 150,
              }}
            >
              Proceed to Pay
            </LoadingButton>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
