import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Avatar, 
  Divider,
  Chip,
  Button,
  IconButton
} from '@mui/material';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Shield,
  Package
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

export const MyAccount = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Mi Cuenta
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Gestiona tu información personal y preferencias
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Información Principal */}
        <Box flex={1}>
          <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  mr: 3
                }}
              >
                {getInitials(user?.names || '')}
              </Avatar>
              <Box>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {user?.names}
                </Typography>
                <Chip
                  icon={<Shield size={16} />}
                  label="Usuario Verificado"
                  color="success"
                  variant="outlined"
                />
              </Box>
              <IconButton
                sx={{ ml: 'auto' }}
                color="primary"
                size="large"
              >
                <Edit size={20} />
              </IconButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={3}>
              <Box display="flex" alignItems="center" mb={2}>
                <Mail size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Correo Electrónico
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user?.email}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Phone size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    No registrado
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <MapPin size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Ciudad
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user?.city || 'No registrada'}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Calendar size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Miembro desde
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user?.createdAt ? formatDate(user.createdAt) : 'Fecha no disponible'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Panel Lateral */}
        <Box width={{ xs: '100%', md: 320 }}>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Acciones Rápidas
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="outlined"
                startIcon={<Package size={18} />}
                onClick={() => navigate('/shipment/create')}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Crear Nuevo Envío
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<User size={18} />}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Editar Perfil
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Información de Seguridad
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Último acceso
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date().toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Estado de la cuenta
                </Typography>
                <Chip
                  label="Activa"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}; 