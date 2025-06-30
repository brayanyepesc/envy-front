import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from './useAuth';

export const useNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return {
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
  };
}; 