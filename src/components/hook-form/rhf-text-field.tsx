import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  allowShowZero?: boolean;
};

export default function RHFTextField({ name, helperText, type, allowShowZero, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          type={type}
          onKeyDown={(event) => {
            if (type === 'number' && ['e', 'E', '+', '-'].includes(event.key)) {
              event.preventDefault();
            }
          }}
          value={type === 'number' && !allowShowZero && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              const numValue = Number(event.target.value) > 0 ? Number(event.target.value) : 0;
              setValue(name, numValue, { shouldValidate: true, shouldDirty: true });
            } else {
              setValue(name, event.target.value, { shouldValidate: true, shouldDirty: true });
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
