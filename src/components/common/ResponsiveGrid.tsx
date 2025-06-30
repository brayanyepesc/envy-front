import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface ResponsiveGridProps extends BoxProps {
  children: React.ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export const ResponsiveGrid = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 3,
  ...props 
}: ResponsiveGridProps) => {
  const getGridTemplateColumns = () => {
    const cols = columns;
    return {
      xs: `repeat(${cols.xs || 1}, 1fr)`,
      sm: cols.sm ? `repeat(${cols.sm}, 1fr)` : undefined,
      md: cols.md ? `repeat(${cols.md}, 1fr)` : undefined,
      lg: cols.lg ? `repeat(${cols.lg}, 1fr)` : undefined,
      xl: cols.xl ? `repeat(${cols.xl}, 1fr)` : undefined,
    };
  };

  return (
    <Box 
      display="grid" 
      gridTemplateColumns={getGridTemplateColumns()}
      gap={gap}
      {...props}
    >
      {children}
    </Box>
  );
}; 