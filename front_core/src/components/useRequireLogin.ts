import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/data/auth';

/**
 * Wraps an action that needs an account (save, submit …). Guests are sent to the sign-in page
 * and come back to the current page afterwards.
 */
export function useRequireLogin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useCallback(
    (action: () => void) => {
      if (user) action();
      else navigate('/login', { state: { from: pathname } });
    },
    [user, navigate, pathname],
  );
}
