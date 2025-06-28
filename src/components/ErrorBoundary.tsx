import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from '@mui/material';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: 3
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                color: '#d97706',
                mb: 3
              }}
            >
              <AlertTriangle size={40} />
            </Box>

            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              ¡Ups! Algo salió mal
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              Ha ocurrido un error inesperado. No te preocupes, nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.
            </Typography>

            {this.state.error && (
              <Box 
                sx={{ 
                  background: '#f3f4f6', 
                  p: 2, 
                  borderRadius: 2, 
                  mb: 4,
                  textAlign: 'left',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Error: {this.state.error.message}
                </Typography>
              </Box>
            )}

            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<RefreshCw size={18} />}
                onClick={this.handleRefresh}
                sx={{
                  background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(to right, #1d4ed8, #4338ca)'
                  }
                }}
              >
                Recargar Página
              </Button>

              <Button
                variant="outlined"
                startIcon={<Home size={18} />}
                onClick={this.handleGoHome}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#9ca3af',
                    backgroundColor: '#f9fafb'
                  }
                }}
              >
                Ir al Inicio
              </Button>
            </Box>

            <Box mt={4}>
              <Typography variant="body2" color="textSecondary">
                Si el problema persiste, contacta soporte técnico
              </Typography>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
} 