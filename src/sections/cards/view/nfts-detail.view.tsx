'use client';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify/iconify';

type Props = {
  NFTsId?: string;
};

const mockDataNFTs = {
  id: 12390,
  title: 'Data Science with R',
  coverUrl: 'https://via.placeholder.com/500',
  description: `The Data Science with R NFT unlocks exclusive resources, tutorials, and certifications to master data analysis, visualization, and machine learning with R. Perfect for beginners and professionals alike, owning this NFT connects you to a community of learners and cutting-edge tools for data-driven success.`,
  details: {
    currentOwner: '0x66d78b125566E37D29F4C73D67CF00Eff739549b',
    collectionAddress: '0xA51b0F76f0d7d558DFc0951CFD74BB85a702Ea95',
    verificationStatus: 'NO',
  },
};

export default function CardsDetailsView({ NFTsId }: Props) {
  const router = useRouter();

  const NFTs = mockDataNFTs;

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'NO':
        return 'error.main';
      case 'YES':
        return 'success.main';
      default:
        return 'text.secondary';
    }
  };

  const handleBack = useCallback(() => {
    router.back(); // ใช้ router.push เพื่อย้อนกลับ
  }, [router]);

  return (
    <Container>
      <Stack alignItems="self-start" spacing={2} sx={{ pt: 4 }}>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<Iconify icon="ep:arrow-left" />}
          onClick={handleBack} // เรียกฟังก์ชัน handleBack
        >
          Back
        </Button>

        <Typography variant="h4">NFT</Typography>

        <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
          <Grid xs={12} md={6} lg={5}>
            <Image alt={NFTs.title} src={NFTs.coverUrl} sx={{ height: 1, borderRadius: 1.5 }} />
          </Grid>
          <Grid xs={12} md={6} lg={7}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Chip label="ERC-721" color="secondary" variant="filled" />
                <Chip label="Token ID #12390" color="secondary" variant="filled" />
              </Stack>

              <Typography variant="h3">{NFTs.title}</Typography>

              <Typography variant="body1">{NFTs.description}</Typography>

              <Stack
                sx={{
                  border: '1px solid rgba(145, 158, 171, 0.24)',
                  borderRadius: 1,
                  px: 1.8,
                  py: 2.8,
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption">Current Owner</Typography>
                  <Typography variant="caption">{NFTs.details.currentOwner}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption">Collection Address</Typography>
                  <Typography variant="caption">{NFTs.details.collectionAddress}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption">Verification Status</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: getVerificationStatusColor(NFTs.details.verificationStatus),
                    }}
                  >
                    {NFTs.details.verificationStatus}
                  </Typography>
                </Box>
              </Stack>

              <Stack alignItems="self-start">
                <Button variant="contained" size="large" color="success">
                  Print to Card
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
