import { Typography, Box } from '@mui/material';
import { Truck } from 'lucide-react';

interface NavbarLogoProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
}

export const NavbarLogo = ({ variant = 'horizontal', size = 'medium' }: NavbarLogoProps) => {
  const iconSizes = {
    small: 20,
    medium: 24,
    large: 32
  };

  const typographyVariants = {
    small: 'body2',
    medium: 'h6',
    large: 'h5'
  } as const;

  const iconSize = iconSizes[size];
  const typographyVariant = typographyVariants[size];

  if (variant === 'vertical') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Box
          sx={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <Truck size={iconSize} color="white" />
        </Box>
        <Box textAlign="center">
          <Typography variant={typographyVariant} sx={{ fontWeight: 'bold', color: 'white' }}>
            Envy
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Logística Inteligente
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box
        sx={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '12px',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <Truck size={iconSize} color="white" />
      </Box>
      <Box>
        <Typography variant={typographyVariant} sx={{ fontWeight: 'bold', color: 'white' }}>
          Envy
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Logística Inteligente
        </Typography>
      </Box>
    </Box>
  );
}; 