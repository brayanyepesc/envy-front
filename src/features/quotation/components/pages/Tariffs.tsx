import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Search, 
  Package, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Info
} from 'lucide-react';
import { QuotationService } from '../../services/quotation.service';
import type { TariffDto } from '../../interfaces/quotation.interface';

export const Tariffs = () => {
  const [tariffs, setTariffs] = useState<TariffDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTariffs();
  }, []);

  const fetchTariffs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await QuotationService.getAllTariffs();
      setTariffs(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar tarifas';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredTariffs = tariffs.filter(tariff => 
    tariff.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tariff.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Tarifas de Envío
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Consulta nuestros precios competitivos para envíos nacionales e internacionales
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={3} mb={4}>
        <Card sx={{ 
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          color: 'white'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Package size={24} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {tariffs.length}
                </Typography>
                <Typography variant="body2">
                  Rutas Disponibles
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          color: 'white'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <MapPin size={24} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {new Set(tariffs.map(t => t.origin)).size}
                </Typography>
                <Typography variant="body2">
                  Ciudades de Origen
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          color: 'white'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <TrendingUp size={24} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {new Set(tariffs.map(t => t.destination)).size}
                </Typography>
                <Typography variant="body2">
                  Ciudades de Destino
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          color: 'white'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <DollarSign size={24} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {tariffs.length > 0 ? formatPrice(Math.min(...tariffs.map(t => t.pricePerKg))) : '$0'}
                </Typography>
                <Typography variant="body2">
                  Precio Mínimo por Kg
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Search Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
          <TextField
            fullWidth
            label="Buscar por origen o destino"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ejemplo: Bogotá, Medellín, Cali"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#6b7280" />
                </InputAdornment>
              )
            }}
            sx={{ flex: 1, minWidth: { xs: 'auto', sm: 300 } }}
          />
        </Box>
        
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Mostrando {filteredTariffs.length} de {tariffs.length} tarifas
          </Typography>
        </Box>
      </Card>

      {/* Tariffs Table */}
      <Box>
        {/* Desktop Table */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MapPin size={16} />
                          Origen
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MapPin size={16} />
                          Destino
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <DollarSign size={16} />
                          Precio por Kg
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Info size={16} />
                          Información
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTariffs.length > 0 ? (
                      filteredTariffs.map((tariff) => (
                        <TableRow 
                          key={tariff.id}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: '#f8f9fa',
                              cursor: 'pointer'
                            },
                            transition: 'background-color 0.2s ease-in-out'
                          }}
                        >
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {tariff.origin}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {tariff.destination}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                              {formatPrice(tariff.pricePerKg)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label="Tarifa por Kg"
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                          <Typography variant="h6" color="textSecondary" gutterBottom>
                            No se encontraron tarifas
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Intenta con otros términos de búsqueda
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Mobile Cards */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {filteredTariffs.length > 0 ? (
            filteredTariffs.map((tariff) => (
              <Card key={tariff.id} sx={{ mb: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <MapPin size={16} color="#6b7280" />
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                        {tariff.origin} → {tariff.destination}
                      </Typography>
                    </Box>
                    <Chip
                      label="Tarifa por Kg"
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  
                  <Box display="flex" alignItems="center" gap={1}>
                    <DollarSign size={16} color="#2e7d32" />
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                      {formatPrice(tariff.pricePerKg)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No se encontraron tarifas
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Intenta con otros términos de búsqueda
              </Typography>
            </Card>
          )}
        </Box>
      </Box>

      {/* Info Section */}
      <Card sx={{ mt: 4, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
            💡 Información Importante
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 2 }}>
            <Typography component="li" variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Los precios mostrados son por kilogramo y se calculan según el peso real del envío
            </Typography>
            <Typography component="li" variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Para obtener una cotización exacta, usa nuestro calculador de cotizaciones
            </Typography>
            <Typography component="li" variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Los precios pueden variar según el volumen y tipo de servicio seleccionado
            </Typography>
            <Typography component="li" variant="body2" color="textSecondary">
              Todas las tarifas incluyen seguro básico y seguimiento en tiempo real
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}; 