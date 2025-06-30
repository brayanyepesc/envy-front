import { Typography, Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface PageHeaderProps extends BoxProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, action, ...props }: PageHeaderProps) => {
  return (
    <Box 
      mb={4} 
      display="flex" 
      flexDirection={{ xs: 'column', md: 'row' }} 
      justifyContent="space-between" 
      alignItems={{ xs: 'flex-start', md: 'center' }} 
      gap={2}
      {...props}
    >
      <Box>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: { xs: '1.75rem', md: '2.125rem' } 
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="h6" 
            color="textSecondary" 
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && action}
    </Box>
  );
}; 