import { Card, CardContent } from '@mui/material';
import { TrackingFormHeader } from '../molecules/TrackingFormHeader';
import { TrackingFormFields } from '../molecules/TrackingFormFields';
import { TrackingFormFooter } from '../molecules/TrackingFormFooter';
import { useTrackingForm } from '../../hooks/useTrackingForm';

export const TrackingForm = () => {
  const {
    trackingNumber,
    error,
    handleSubmit,
    handleTrackingNumberChange,
    handleKeyPress,
    handleQuotationClick
  } = useTrackingForm();

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
        <TrackingFormHeader />
        
        <TrackingFormFields
          trackingNumber={trackingNumber}
          error={error}
          onTrackingNumberChange={handleTrackingNumberChange}
          onKeyPress={handleKeyPress}
          onSubmit={handleSubmit}
        />
        
        <TrackingFormFooter onQuotationClick={handleQuotationClick} />
      </CardContent>
    </Card>
  );
};
