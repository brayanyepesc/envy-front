import { 
  Avatar, 
  Menu, 
  MenuItem, 
  IconButton 
} from '@mui/material';
import { User, LogOut } from 'lucide-react';

interface NavbarUserMenuProps {
  anchorEl: HTMLElement | null;
  user: any;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  onLogout: () => void;
  onMyAccount: () => void;
  getInitials: (name: string) => string;
}

export const NavbarUserMenu = ({
  anchorEl,
  user,
  onMenuOpen,
  onMenuClose,
  onLogout,
  onMyAccount,
  getInitials
}: NavbarUserMenuProps) => {
  return (
    <>
      <IconButton
        onClick={onMenuOpen}
        sx={{
          p: 0,
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s ease-in-out'
          }
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'rgba(255,255,255,0.15)',
            color: 'white',
            fontWeight: 'bold',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
        >
          {getInitials(user?.name || 'Usuario')}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onMyAccount} sx={{ py: 1.5 }}>
          <User size={18} style={{ marginRight: 12 }} />
          Mi Cuenta
        </MenuItem>
        <MenuItem onClick={onLogout} sx={{ py: 1.5, color: '#ef4444' }}>
          <LogOut size={18} style={{ marginRight: 12 }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}; 