import { Container } from '@mui/material';
import type { ContainerProps } from '@mui/material';

interface ResponsiveContainerProps extends ContainerProps {
  children: React.ReactNode;
}

export const ResponsiveContainer = ({ children, ...props }: ResponsiveContainerProps) => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        px: { xs: 2, md: 4 },
        ...props.sx 
      }} 
      {...props}
    >
      {children}
    </Container>
  );
}; 