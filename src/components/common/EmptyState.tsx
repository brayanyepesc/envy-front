import { Box, Typography, Card } from '@mui/material';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'card' | 'simple';
}

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  variant = 'simple' 
}: EmptyStateProps) => {
  const content = (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      py={4}
      gap={2}
    >
      <Icon size={48} color="#ccc" />
      <Typography variant="h6" color="textSecondary" textAlign="center">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="textSecondary" textAlign="center">
          {description}
        </Typography>
      )}
      {action && action}
    </Box>
  );

  if (variant === 'card') {
    return (
      <Card sx={{ p: 4, textAlign: 'center' }}>
        {content}
      </Card>
    );
  }

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2,
        p: 4
      }}
    >
      {content}
    </Box>
  );
}; 