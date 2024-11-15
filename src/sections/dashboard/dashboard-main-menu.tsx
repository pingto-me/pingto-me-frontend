import { Box, Stack, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { iconSrc } from 'src/utils/icon';

import { CenterStack } from 'src/components/box';

export default function DashboardMainMenu() {
  const router = useRouter();

  const menus = [
    {
      title: 'Quests',
      icon: 'ic_gameboy',
      path: paths.quests.root,
    },
    {
      title: 'Mini Quests',
      icon: 'ic_game',
      path: paths.miniQuests,
    },
    {
      title: 'Referral',
      icon: 'ic_link_square',
      path: paths.referral,
    },
    {
      title: 'Ranking',
      icon: 'ic_cup',
      path: paths.ranking,
    },

    {
      title: 'Rewards',
      icon: 'ic_star',
      path: paths.rewards,
    },
    {
      title: 'Badges',
      icon: 'ic_award',
      path: paths.badges,
    },
    {
      title: 'IPA',
      icon: 'ic_omega_square',
      path: paths.ipa.root,
    },
    {
      title: 'Settings',
      icon: 'ic_setting',
      path: paths.settings,
    },
  ];

  return (
    <Stack spacing={2} mb={1}>
      <Typography fontWeight={700}>Main Menu</Typography>

      <Box rowGap={3} display="grid" gridTemplateColumns="repeat(4, 1fr)">
        {menus.map((menu) => (
          <CenterStack key={menu.title}>
            <IconButton onClick={() => router.push(menu.path)}>
              <Box component="img" src={iconSrc(menu.icon)} />
            </IconButton>
            <Typography variant="caption">{menu.title}</Typography>
          </CenterStack>
        ))}
      </Box>
    </Stack>
  );
}
