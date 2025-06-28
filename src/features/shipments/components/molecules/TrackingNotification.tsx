import { 
  Snackbar, 
  Alert, 
  Box, 
  Typography,
  Chip
} from '@mui/material';
import { 
  CheckCircle, 
  Truck, 
  Package, 
  Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface TrackingNotificationProps {
  currentStatus: string;
  previousStatus?: string;
  trackingNumber: string;
  onClose: () => void;
  open: boolean;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'waiting':
      return <Package size={20} />;
    case 'processing':
      return <Clock size={20} />;
    case 'in_transit':
      return <Truck size={20} />;
    case 'delivered':
      return <CheckCircle size={20} />;
    default:
      return <Package size={20} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'waiting':
      return '#ff9800';
    case 'processing':
      return '#9c27b0';
    case 'in_transit':
      return '#2196f3';
    case 'delivered':
      return '#4caf50';
    default:
      return '#757575';
  }
};

const getStatusMessage = (status: string) => {
  const messages: { [key: string]: string } = {
    'waiting': 'Tu envío está en espera de ser procesado',
    'processing': 'Tu envío está siendo procesado',
    'in_transit': '¡Tu envío está en camino!',
    'delivered': '¡Tu envío ha sido entregado!'
  };
  return messages[status] || 'Estado actualizado';
};

export const TrackingNotification = ({
  currentStatus,
  previousStatus,
  trackingNumber,
  onClose,
  open
}: TrackingNotificationProps) => {
  const [autoHide, setAutoHide] = useState(true);

  useEffect(() => {
    // Solo mostrar notificación si el estado cambió
    if (previousStatus && previousStatus !== currentStatus) {
      setAutoHide(true);
    }
  }, [currentStatus, previousStatus]);

  const handleClose = () => {
    setAutoHide(false);
    onClose();
  };

  if (!open || !autoHide) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: 8 }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        icon={getStatusIcon(currentStatus)}
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: `2px solid ${getStatusColor(currentStatus)}`,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          '& .MuiAlert-icon': {
            color: getStatusColor(currentStatus)
          }
        }}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Actualización de Seguimiento
            </Typography>
            <Chip
              label={currentStatus === 'delivered' ? 'Entregado' : 'Actualizado'}
              size="small"
              color={currentStatus === 'delivered' ? 'success' : 'primary'}
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" color="textSecondary" mb={1}>
            #{trackingNumber}
          </Typography>
          
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {getStatusMessage(currentStatus)}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}; 