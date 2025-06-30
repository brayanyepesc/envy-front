import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box
} from '@mui/material';
import { Search, Package, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

export const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Por favor ingresa un número de seguimiento');
      return;
    }

    if (trackingNumber.trim().length < 8) {
      setError('El número de seguimiento debe tener al menos 8 caracteres');
      return;
    }

    setError('');
    // Redirigir al tracking en tiempo real
    navigate(`/tracking/${trackingNumber.trim()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const formEvent = e as unknown as React.FormEvent;
      handleSubmit(formEvent);
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              color: 'white',
              mb: 3
            }}
          >
            <Package size={32} />
          </Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Rastrea tu Envío
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Ingresa tu número de seguimiento para conocer el estado actual de tu envío en tiempo real
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
            <TextField
              fullWidth
              label="Número de Seguimiento"
              value={trackingNumber}
              onChange={(e) => {
                setTrackingNumber(e.target.value);
                if (error) setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Ejemplo: 56000000000"
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <MapPin size={20} color="#6b7280" style={{ marginRight: 8 }} />
                )
              }}
              sx={{ flex: 1, minWidth: { xs: 'auto', sm: 300 } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Search size={20} />}
              disabled={!trackingNumber.trim()}
              sx={{
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                color: 'white',
                px: { xs: 2, sm: 4 },
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                minWidth: { xs: 'auto', sm: 'fit-content' },
                '&:hover': {
                  background: 'linear-gradient(to right, #1d4ed8, #4338ca)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
                },
                '&:disabled': {
                  background: '#e5e7eb',
                  color: '#9ca3af'
                }
              }}
            >
              Rastrear
            </Button>
          </Box>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            💡 ¿No tienes un número de seguimiento? 
            <Button 
              onClick={() => navigate('/quotation')}
              sx={{ 
                textTransform: 'none', 
                color: '#2563eb',
                fontWeight: 600,
                p: 0,
                minWidth: 'auto',
                '&:hover': {
                  background: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Cotiza tu envío aquí
            </Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
