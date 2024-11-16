'use client';

import React, { useState } from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';

import { iconSrc } from 'src/utils/icon';

// Mock data
interface ProfileCard {
  id: number;
  name: string;
  score: string;
  image: string;
}

interface NftCard {
  id: number;
  title: string;
  score: string;
  image: string;
}

interface MockData {
  [key: string]: {
    profileCard: ProfileCard[];
    nftCard: NftCard[];
  };
}

const mockData: MockData = {
  Weekly: {
    profileCard: [
      { id: 1, name: 'Jayvion Simon', score: '9.8k pinged', image: iconSrc('avatarIcon') },
      { id: 2, name: 'Jayvion Simon', score: '8.6k pinged', image: iconSrc('avatarIcon') },
      { id: 3, name: 'Jayvion Simon', score: '8.5k pinged', image: iconSrc('avatarIcon') },
      { id: 4, name: 'Jayvion Simon', score: '7.9k pinged', image: iconSrc('avatarIcon') },
      { id: 5, name: 'Jayvion Simon', score: '7.7k pinged', image: iconSrc('avatarIcon') },
    ],
    nftCard: [
      { id: 1, title: 'Data Science with R', score: '5.8k pinged', image: iconSrc('nftIcon') },
      { id: 2, title: 'Data Science with R', score: '5.2k pinged', image: iconSrc('nftIcon') },
      { id: 3, title: 'Data Science with R', score: '5.1k pinged', image: iconSrc('nftIcon') },
      { id: 4, title: 'Data Science with R', score: '3.8k pinged', image: iconSrc('nftIcon') },
      { id: 5, title: 'Data Science with R', score: '3.7k pinged', image: iconSrc('nftIcon') },
    ],
  },
};

// Icon utility function

export default function WorldRankingPage() {
  const [selectedTab, setSelectedTab] = useState('Weekly');
  const data = mockData[selectedTab];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        World Ranking
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: 'flex', gap: 3, my: 4 }}>
        {['Weekly', 'Monthly', 'Annual', 'All Time'].map((tab, index) => (
          <Typography
            key={index}
            variant="body1"
            onClick={() => setSelectedTab(tab)}
            sx={{
              cursor: 'pointer',
              fontWeight: selectedTab === tab ? 'bold' : 'normal',
              color: selectedTab === tab ? 'text.primary' : 'text.secondary',
              position: 'relative',
              transition: 'all 0.3s',
              '&::after': {
                content: '""',
                display: 'block',
                height: '2px',
                width: selectedTab === tab ? '100%' : '0',
                backgroundColor: selectedTab === tab ? '#000' : 'transparent',
                transition: 'width 0.3s',
                marginTop: '16px',
              },
            }}
          >
            {tab}
          </Typography>
        ))}
      </Box>

      {/* Table Layout */}
      <Grid container spacing={4}>
        {/* Header */}
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold">
            Profile Card
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight="bold">
            NFT Card
          </Typography>
        </Grid>

        {/* Rows */}
        {data?.profileCard?.map((profile, index) => {
          const nft = data.nftCard[index]; // Match NFT Card with Profile Card

          // Determine rank icon
          const rankIcons: Record<number, string> = {
            1: 'firstCrown',
            2: 'secondCrown',
            3: 'thirdCrown',
          };
          const profileRankIcon = rankIcons[profile.id] ? iconSrc(rankIcons[profile.id]) : null;
          const nftRankIcon = rankIcons[nft.id] ? iconSrc(rankIcons[nft.id]) : null;

          return (
            <Grid
              container
              key={index}
              spacing={4}
              sx={{ borderBottom: '1px solid #E0E0E0', py: 2, alignItems: 'center' }}
            >
              {/* Profile Card Column */}
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                {/* Rank Icon or Number */}
                {profileRankIcon ? (
                  <Box
                    component="img"
                    src={profileRankIcon}
                    alt={`Rank ${profile.id}`}
                    sx={{ width: 24, height: 24 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {profile.id}.
                  </Typography>
                )}
                <Box
                  component="img"
                  src={profile.image}
                  alt={profile.name}
                  sx={{ width: 48, height: 48, borderRadius: '50%' }}
                />
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {profile.name}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#212121',
                    color: '#fff',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    minWidth: 80,
                  }}
                >
                  {profile.score}
                </Box>
              </Grid>

              {/* NFT Card Column */}
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                {nftRankIcon ? (
                  <Box
                    component="img"
                    src={nftRankIcon}
                    alt={`Rank ${nft.id}`}
                    sx={{ width: 24, height: 24 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {nft.id}.
                  </Typography>
                )}
                <Box
                  component="img"
                  src={nft.image}
                  alt={nft.title}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {nft.title}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#212121',
                    color: '#fff',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    minWidth: 80,
                  }}
                >
                  {nft.score}
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
