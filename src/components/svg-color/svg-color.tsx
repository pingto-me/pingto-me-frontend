import { forwardRef } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export type SvgColorProps = BoxProps & {
  src: string;
  color?: string;
  size?: number;
};

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, sx, color, size, ...other }, ref) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: size || 20,
        height: size || 20,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        color,
        ...sx,
      }}
      {...other}
    />
  )
);

export default SvgColor;
