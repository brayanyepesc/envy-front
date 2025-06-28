import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  Avatar, 
  Stack
} from '@mui/material';
import { 
  Truck, 
  Package, 
  Shield, 
  Clock, 
  MapPin, 
  DollarSign, 
  Star, 
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { TrackingForm } from '../organisms/TrackingForm';
import { useState, useCallback } from 'react';

export const Home = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = useCallback(() => {
    if (trackingNumber.trim()) {
      console.log("Rastreando:", trackingNumber);
    }
  }, [trackingNumber]);

  const handleGenerateGuide = useCallback(() => {
    navigate('/quotation');
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const features = [
    {
      icon: <Truck size={32} />,
      title: "Envíos Rápidos",
      description: "Entrega en 24-48 horas en todo el país con nuestra red logística optimizada."
    },
    {
      icon: <Shield size={32} />,
      title: "Seguridad Garantizada",
      description: "Cada envío está asegurado y monitoreado en tiempo real para tu tranquilidad."
    },
    {
      icon: <Clock size={32} />,
      title: "Seguimiento en Tiempo Real",
      description: "Conoce la ubicación exacta de tu paquete en cualquier momento del día."
    },
    {
      icon: <DollarSign size={32} />,
      title: "Precios Competitivos",
      description: "Las mejores tarifas del mercado sin costos ocultos ni sorpresas."
    }
  ];

  const services = [
    {
      title: "Envíos Nacionales",
      description: "Cobertura completa en Colombia con entrega garantizada.",
      price: "Desde $15.000",
      features: ["Entrega 24-48h", "Seguimiento en tiempo real", "Seguro incluido"]
    },
    {
      title: "Envíos Express",
      description: "Servicio premium para entregas urgentes y de alto valor.",
      price: "Desde $25.000",
      features: ["Entrega 12-24h", "Manejo especial", "Seguro premium"]
    },
    {
      title: "Envíos Masivos",
      description: "Solución empresarial para grandes volúmenes de envíos.",
      price: "Precios especiales",
      features: ["Descuentos por volumen", "API disponible", "Soporte dedicado"]
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Emprendedora",
      avatar: "MG",
      content: "Envy ha transformado mi negocio. Los envíos son rápidos y confiables, y mis clientes están muy satisfechos.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      role: "CEO TechStart",
      avatar: "CR",
      content: "La mejor experiencia de envíos que he tenido. El seguimiento en tiempo real es increíble.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Comerciante Online",
      avatar: "AM",
      content: "Precios justos, servicio excelente y entrega puntual. ¡Altamente recomendado!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Envíos Completados", icon: <Package size={24} /> },
    { number: "99.8%", label: "Tasa de Entrega", icon: <CheckCircle size={24} /> },
    { number: "24h", label: "Tiempo Promedio", icon: <Clock size={24} /> },
    { number: "15+", label: "Ciudades Cubiertas", icon: <MapPin size={24} /> }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }}
        />
        
        <Container maxWidth="xl">
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={6} alignItems="center">
            <Box sx={{ color: 'white' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Logística Inteligente para tu Negocio
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontWeight: 400
                }}
              >
                Envíos rápidos, seguros y confiables en toda Colombia. 
                Rastrea tus paquetes en tiempo real y optimiza tu logística.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={6}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  sx={{
                    background: 'white',
                    color: '#2563eb',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  Comenzar Ahora
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Ver Demo
                </Button>
              </Stack>
            </Box>
            
            <Box>
              <Card 
                sx={{ 
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  p: 4
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                  Rastrea tu Envío
                </Typography>
                <TrackingForm
                  trackingNumber={trackingNumber}
                  onTrackingNumberChange={setTrackingNumber}
                  onTrack={handleTrack}
                  onGenerateGuide={handleGenerateGuide}
                />
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, background: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
            {stats.map((stat, index) => (
              <Box key={index} textAlign="center">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                    color: 'white',
                    mb: 2
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              ¿Por qué elegir Envy?
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Ofrecemos la mejor experiencia de envíos con tecnología de vanguardia y servicio al cliente excepcional.
            </Typography>
          </Box>
          
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
            {features.map((feature, index) => (
              <Card 
                key={index}
                sx={{ 
                  height: '100%',
                  p: 4,
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
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
                    background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                    color: 'white',
                    mb: 3
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 12, background: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Nuestros Servicios
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Soluciones logísticas adaptadas a tus necesidades específicas.
            </Typography>
          </Box>
          
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            {services.map((service, index) => (
              <Card 
                key={index}
                sx={{ 
                  height: '100%',
                  p: 4,
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                  {service.description}
                </Typography>
                
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 3 }}>
                  {service.price}
                </Typography>
                
                <Box>
                  {service.features.map((feature, featureIndex) => (
                    <Box key={featureIndex} display="flex" alignItems="center" mb={1}>
                      <CheckCircle size={16} color="#10b981" style={{ marginRight: 8 }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Lo que dicen nuestros clientes
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Miles de empresas confían en nosotros para sus envíos.
            </Typography>
          </Box>
          
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} sx={{ p: 4, height: '100%' }}>
                <Box display="flex" alignItems="center" mb={3}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} color="#fbbf24" fill="#fbbf24" />
                  ))}
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </Typography>
                
                <Box display="flex" alignItems="center">
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                      mr: 2
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 12, 
          background: 'linear-gradient(to right, #2563eb, #4f46e5)',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              ¿Listo para optimizar tu logística?
            </Typography>
            <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
              Únete a miles de empresas que ya confían en Envy para sus envíos.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  background: 'white',
                  color: '#2563eb',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                Comenzar Gratis
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Contactar Ventas
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
