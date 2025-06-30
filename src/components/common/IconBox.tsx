import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { LucideIcon } from 'lucide-react';

interface IconBoxProps extends BoxProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  background?: string;
  variant?: 'circle' | 'square' | 'rounded';
}

export const IconBox = ({ 
  icon: Icon, 
  size = 24, 
  color = 'white',
  background = 'linear-gradient(to right, #2563eb, #4f46e5)',
  variant = 'circle',
  ...props 
}: IconBoxProps) => {
  const borderRadius = variant === 'circle' ? '50%' : variant === 'rounded' ? '12px' : '4px';
  
  return (
    <Box 
      sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 16,
        height: size + 16,
        borderRadius,
        background,
        color,
        ...props.sx 
      }}
      {...props}
    >
      <Icon size={size} />
    </Box>
  );
}; 