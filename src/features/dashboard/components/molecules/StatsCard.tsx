import { Card, CardContent, Typography, Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  sx?: SxProps<Theme>;
}

export const StatsCard = ({ title, value, icon: Icon, subtitle, sx }: StatsCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(to right, #2563eb, #4f46e5)',
        color: 'white',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        ...sx
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1.25rem' } }}>
            {title}
          </Typography>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%', 
              p: { xs: 0.75, md: 1 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 }
            }}
          >
            <Icon size={20} color="white" />
          </Box>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}; 