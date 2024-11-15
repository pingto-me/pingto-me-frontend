export const paths = {
  login: `/login`,
  root: `/dashboard`,
  dashboard: `/dashboard`,
  reference: `/reference`,
  badges: `/badges`,
  quests: {
    root: `/quests`,
    quest: (id: string) => `/quests/${id}`,
  },
  miniQuests: '/mini-quests',
  report: '/report',
  referral: '/referral',
  ranking: '/ranking',
  rewards: '/rewards',
  ipa: {
    root: '/ipa',
    create: '/ipa/create',
    view: {
      qr: '/ipa/qr-code',
      tag: '/ipa/tag',
    },
  },
  settings: '/settings',
};
