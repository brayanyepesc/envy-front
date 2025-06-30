import { Card, CardContent, Typography, Box } from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, Package, DollarSign } from 'lucide-react';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface DashboardChartsProps {
  shipments: ShipmentDetailsResponseDto[];
}

// Paleta de colores moderna y atractiva
const COLORS = {
  primary: '#2563eb',
  secondary: '#4f46e5',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
  gradient: 'linear-gradient(to right, #2563eb, #4f46e5)',
  gradientSuccess: 'linear-gradient(to right, #10b981, #059669)',
  gradientWarning: 'linear-gradient(to right, #f59e0b, #d97706)',
  gradientDanger: 'linear-gradient(to right, #ef4444, #dc2626)'
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

export const DashboardCharts = ({ shipments }: DashboardChartsProps) => {
  const getStatusData = () => {
    const statusCount: { [key: string]: number } = {};
    shipments.forEach(shipment => {
      statusCount[shipment.status] = (statusCount[shipment.status] || 0) + 1;
    });

    return Object.entries(statusCount).map(([status, count]) => ({
      name: getStatusLabel(status),
      value: count,
      status,
      color: getStatusColor(status)
    }));
  };

  const getMonthlyData = () => {
    const monthlyCount: { [key: string]: number } = {};
    shipments.forEach(shipment => {
      const date = new Date(shipment.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyCount[monthKey] = (monthlyCount[monthKey] || 0) + 1;
    });

    return Object.entries(monthlyCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({
        month: formatMonth(month),
        envios: count
      }));
  };

  const getPriceData = () => {
    return shipments
      .slice(0, 10)
      .map(shipment => ({
        tracking: shipment.trackingNumber.slice(-6),
        precio: parseFloat(String(shipment.quotedPrice))
      }));
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'waiting': 'Esperando',
      'in_transit': 'En Tránsito',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado',
      'processing': 'Procesando'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'waiting': COLORS.warning,
      'in_transit': COLORS.info,
      'delivered': COLORS.success,
      'cancelled': COLORS.danger,
      'processing': COLORS.purple
    };
    return colors[status] || COLORS.primary;
  };

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ 
                color: entry.color,
                fontWeight: 500 
              }}
            >
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  const statusData = getStatusData();
  const monthlyData = getMonthlyData();
  const priceData = getPriceData();

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* Gráfica de Estados - Pie Chart Mejorado */}
      <Card 
        sx={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Box
              sx={{
                background: COLORS.gradient,
                borderRadius: '12px',
                p: 1.5,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Package size={20} color="white" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                Estados de Envíos
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Distribución por estado actual
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center', md: 'flex-start' }} gap={4}>
            <Box flex={1} minHeight={280}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            
            <Box width={{ xs: '100%', md: 200 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#374151', textAlign: { xs: 'center', md: 'left' } }}>
                Leyenda
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {statusData.map((item, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: item.color
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.name}: {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Gráficas de Línea y Barras */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={4}>
        {/* Gráfica de Barras - Envíos por Mes */}
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Box
                sx={{
                  background: COLORS.gradientSuccess,
                  borderRadius: '12px',
                  p: 1.5,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TrendingUp size={20} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                  Envíos por Mes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tendencias mensuales
                </Typography>
              </Box>
            </Box>
            
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(102, 126, 234, 0.1)' }}
                />
                <Bar 
                  dataKey="envios" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfica de Área - Precios de Envíos */}
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Box
                sx={{
                  background: COLORS.gradientWarning,
                  borderRadius: '12px',
                  p: 1.5,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DollarSign size={20} color="white" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                  Precios de Envíos
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Últimos 10 envíos
                </Typography>
              </Box>
            </Box>
            
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="tracking" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `$${String(value).toLocaleString()}`}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Precio']}
                />
                <Area 
                  type="monotone" 
                  dataKey="precio" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  fill="url(#areaGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}; 