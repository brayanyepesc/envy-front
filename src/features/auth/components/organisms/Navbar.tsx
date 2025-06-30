import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { 
  AppBar, 
  Button, 
  Toolbar, 
  Typography, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  User, 
  LogOut, 
  Settings, 
  Package,
  Calculator,
  BarChart3,
  Truck,
  Home,
  MapPin,
  DollarSign,
  Menu as MenuIcon
} from 'lucide-react';
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    setMobileMenuOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isAuthPage = location.pathname === '/auth';

  const navigationItems = isAuthenticated ? [
    { label: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={18} /> },
    { label: 'Cotización', path: '/quotation', icon: <Calculator size={18} /> },
    { label: 'Crear Envío', path: '/shipment/create', icon: <Package size={18} /> },
    { label: 'Tracking', path: '/tracking', icon: <MapPin size={18} /> },
    { label: 'Tarifas', path: '/tariffs', icon: <DollarSign size={18} /> }
  ] : [
    { label: 'Tracking', path: '/tracking', icon: <MapPin size={18} /> },
    { label: 'Tarifas', path: '/tariffs', icon: <DollarSign size={18} /> }
  ];

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: 280,
          background: 'linear-gradient(to bottom, #2563eb, #4f46e5)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Box
            sx={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Truck size={24} color="white" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Envy
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Logística Inteligente
            </Typography>
          </Box>
        </Box>

        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {isAuthenticated && (
          <>
            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate('/my-account');
                    setMobileMenuOpen(false);
                  }}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <User size={18} />
                  </ListItemIcon>
                  <ListItemText primary="Mi Cuenta" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 1,
                    color: '#ef4444',
                    '&:hover': {
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
                    <LogOut size={18} />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar sesión" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleNavigation(isAuthPage ? "/" : "/auth")}
              startIcon={isAuthPage ? <Home size={18} /> : undefined}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.5)'
                }
              }}
            >
              {isAuthPage ? 'Home' : 'Ingresar'}
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ 
        background: "linear-gradient(to right, #2563eb, #4f46e5)",
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
              transform: 'scale(1.02)',
              transition: 'all 0.2s ease-in-out'
            }
          }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Truck size={24} color="white" />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              Envy
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Logística Inteligente
            </Typography>
          </Box>
        </Box>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            {isAuthenticated ? (
              <Box display="flex" alignItems="center" gap={1}>
                {navigationItems.map((item) => (
                  <Button 
                    key={item.path}
                    color="inherit" 
                    onClick={() => navigate(item.path)}
                    startIcon={item.icon}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {getInitials(user?.names || '')}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      borderRadius: 2,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem 
                    onClick={() => {
                      navigate('/my-account');
                      handleMenuClose();
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <User size={18} style={{ marginRight: 12 }} />
                    Mi Cuenta
                  </MenuItem>
                  
                  <MenuItem 
                    onClick={handleMenuClose}
                    sx={{ py: 1.5 }}
                  >
                    <Settings size={18} style={{ marginRight: 12 }} />
                    Configuración
                  </MenuItem>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      py: 1.5,
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'white'
                      }
                    }}
                  >
                    <LogOut size={18} style={{ marginRight: 12 }} />
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={2}>
                {navigationItems.map((item) => (
                  <Button 
                    key={item.path}
                    color="inherit" 
                    onClick={() => navigate(item.path)}
                    startIcon={item.icon}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                <Button 
                  color="inherit" 
                  onClick={() => navigate(isAuthPage ? "/" : "/auth")}
                  variant="outlined"
                  startIcon={isAuthPage ? <Home size={18} /> : undefined}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.5)'
                    }
                  }}
                >
                  {isAuthPage ? 'Home' : 'Ingresar'}
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={handleMobileMenuToggle}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <MenuIcon size={24} />
          </IconButton>
        )}
      </Toolbar>

      {mobileMenu}
    </AppBar>
  );
};
