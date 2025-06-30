import { Alert } from '@mui/material';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export const SuccessMessage = ({ message, onClose }: SuccessMessageProps) => {
  if (!message) return null;

  return (
    <Alert 
      severity="success" 
      sx={{ mb: 3 }}
      onClose={onClose}
    >
      {message}
    </Alert>
  );
}; 