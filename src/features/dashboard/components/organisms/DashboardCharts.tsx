import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { ShipmentDetailsResponseDto } from '../../../shipments/interfaces/shipment.interface';

interface DashboardChartsProps {
  shipments: ShipmentDetailsResponseDto[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const DashboardCharts = ({ shipments }: DashboardChartsProps) => {
  const getStatusData = () => {
    const statusCount: { [key: string]: number } = {};
    shipments.forEach(shipment => {
      statusCount[shipment.status] = (statusCount[shipment.status] || 0) + 1;
    });

    return Object.entries(statusCount).map(([status, count]) => ({
      name: getStatusLabel(status),
      value: count,
      status
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
        precio: parseFloat(shipment.quotedPrice)
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

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  };

  const statusData = getStatusData();
  const monthlyData = getMonthlyData();
  const priceData = getPriceData();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" gap={3} flexWrap="wrap">
        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Estados de Envíos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Envíos por Mes
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="envios" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Precios de Envíos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tracking" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Precio']} />
                <Line type="monotone" dataKey="precio" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}; 