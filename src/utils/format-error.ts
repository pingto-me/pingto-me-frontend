import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';

export const fError = (error: unknown): string => {
  if (error instanceof TypeError) {
    return Array.isArray(error.message) ? error.message[0] : error.message;
  }
  if (error instanceof AxiosError) {
    return Array.isArray(error.message) ? error.message[0] : error.message;
  }
  if (typeof error === 'string') {
    return error;
  }

  const err = (error as any)?.message;

  if (err) {
    if (Array.isArray(err)) {
      return err[0];
    }
    return err;
  }

  return 'unknown error instance';
};

export const toastError = (error: unknown) => {
  const errorMessage = fError(error);
  enqueueSnackbar(errorMessage);
};
