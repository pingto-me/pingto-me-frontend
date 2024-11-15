import Stack, { StackProps } from '@mui/material/Stack';

export default function CenterStack({ children, ...other }: StackProps) {
  return (
    <Stack justifyContent="center" alignItems="center" {...other}>
      {children}
    </Stack>
  );
}
