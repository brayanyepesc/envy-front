import { 
  AppBar, 
  Button, 
  Toolbar, 
  Box, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';
import { useNavbar } from '../../hooks/useNavbar';
import { NavbarLogo } from '../molecules/NavbarLogo';
import { NavbarMobileMenu } from '../molecules/NavbarMobileMenu';
import { NavbarUserMenu } from '../molecules/NavbarUserMenu';
import { getNavigationItems } from '../molecules/NavbarNavigation';

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    isAuthenticated,
    user,
    anchorEl,
    mobileMenuOpen,
    isAuthPage,
    handleLogout,
    handleMenuOpen,
    handleMenuClose,
    handleMobileMenuToggle,
    handleNavigation,
    getInitials
  } = useNavbar();

  const navigationItems = getNavigationItems(isAuthenticated);

  if (isAuthPage) {
    return null;
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(to right, #2563eb, #4f46e5)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <NavbarLogo size="medium" />

        {isMobile ? (
          <Button
            onClick={handleMobileMenuToggle}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <MenuIcon size={24} />
          </Button>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{ 
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {isAuthenticated && !isMobile && (
          <NavbarUserMenu
            anchorEl={anchorEl}
            user={user}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            onLogout={handleLogout}
            onMyAccount={() => handleNavigation('/my-account')}
            getInitials={getInitials}
          />
        )}

        {!isAuthenticated && !isMobile && (
          <Button
            variant="outlined"
            onClick={() => handleNavigation('/auth')}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              textTransform: 'none',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Iniciar sesión
          </Button>
        )}
      </Toolbar>

      <NavbarMobileMenu
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        navigationItems={navigationItems}
        isAuthenticated={isAuthenticated}
        onNavigation={handleNavigation}
        onLogout={handleLogout}
      />
    </AppBar>
  );
};
