'use client';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { CardNFT } from 'src/components/ui-kit/card-nft';

const nftsData = [
  {
    id: 12390,
    title: 'Data Science with R',
  },
  {
    id: 12391,
    title: 'Introduction to Python',
  },
  {
    id: 12392,
    title: 'Machine Learning Basics',
  },
  {
    id: 12393,
    title: 'Web Development with JavaScript',
  },
  {
    id: 12394,
    title: 'Blockchain for Beginners',
  },
  {
    id: 12395,
    title: 'AI with TensorFlow',
  },
];

export default function NFTsListView() {
  const router = useRouter();

  const handleDetailsNFTs = useCallback(
    (id: string) => {
      router.push(`/nft-gallory/${id}/detail`);
    },
    [router]
  );

  return (
    <Container>
      <Stack spacing={3}>
        <Box sx={{ pt: 4 }}>
          <Typography variant="h4">Your NFTs</Typography>
        </Box>
        <Grid container spacing={3}>
          {Array.isArray(nftsData) && nftsData.length > 0 ? (
            nftsData.map((nfts: any, index: number) => (
              <Grid xs={12} sm={6} md={4} lg={4} key={index}>
                <Box sx={{ p: 3, cursor: 'pointer' }} onClick={() => handleDetailsNFTs(nfts.id)}>
                  <CardNFT isExpand={false} certified={false} />
                </Box>
                {/* <Card sx={{ p: 3, cursor: 'pointer' }} onClick={() => handleDetailsNFTs(nfts.id)}>
                  <Typography variant="h4">{nfts.title}</Typography>
                </Card> */}
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" sx={{ width: '100%' }}>
              No Data
            </Typography>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
