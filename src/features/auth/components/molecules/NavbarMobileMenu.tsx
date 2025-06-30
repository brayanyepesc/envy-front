import { 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { User, LogOut } from 'lucide-react';
import { NavbarLogo } from './NavbarLogo';
import type { NavigationItem } from './NavbarNavigation';

interface NavbarMobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  isAuthenticated: boolean;
  onNavigation: (path: string) => void;
  onLogout: () => void;
}

export const NavbarMobileMenu = ({
  open,
  onClose,
  navigationItems,
  isAuthenticated,
  onNavigation,
  onLogout
}: NavbarMobileMenuProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          background: 'linear-gradient(to bottom, #2563eb, #4f46e5)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <NavbarLogo variant="vertical" size="medium" />

        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => onNavigation(item.path)}
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
                  onClick={() => onNavigation('/my-account')}
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
                  onClick={onLogout}
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
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => onNavigation('/auth')}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <User size={18} />
                  </ListItemIcon>
                  <ListItemText primary="Iniciar sesión" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}; 