import React from 'react';

import {
  Box,
  Card,
  Radio,
  Stack,
  Select,
  MenuItem,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

// Replace with your Iconify setup

const ConfigurationsCard = () => (
  <Card sx={{ border: 0, boxShadow: 0 }}>
    {/* Configurations Section */}
    <Box sx={{ mb: 3 }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Template
        </Typography>
        <Select
          defaultValue="default"
          size="small"
          fullWidth
          sx={{
            '& .MuiSelect-select': {
              backgroundColor: '#fff',
              borderRadius: 1,
            },
          }}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </Box>
    </Box>

    {/* Delivery Information Section */}
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Delivery Information
      </Typography>
      <RadioGroup defaultValue="pickup" row>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            value="pickup"
            control={
              <Radio
                sx={{
                  '&.Mui-checked': {
                    color: '#82F2CB',
                  },
                }}
              />
            }
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Box />
                Pick up at PINGTOME head quarter
              </Box>
            }
          />
          <FormControlLabel
            value="delivery"
            control={
              <Radio
                sx={{
                  '&.Mui-checked': {
                    color: '#82F2CB',
                  },
                }}
              />
            }
            label="Delivery to Address"
          />
        </Stack>
      </RadioGroup>
    </Box>
  </Card>
);

export default ConfigurationsCard;
