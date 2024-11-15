import Dialog from '@mui/material/Dialog';
import { Box, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

import { iconSrc } from 'src/utils/icon';

import { CenterStack } from '../box';
import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function CompletedDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogContent sx={{ py: 3 }}>
        <CenterStack>
          <Box component="img" src={iconSrc('ic_checkmark_fill')} />
          <Stack spacing={3} width={1}>
            <CenterStack>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2">{content}</Typography>
            </CenterStack>
            {action}
          </Stack>
        </CenterStack>
      </DialogContent>
    </Dialog>
  );
}
