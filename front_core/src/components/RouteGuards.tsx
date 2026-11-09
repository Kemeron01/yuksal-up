import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, type Role } from '@/data/auth';

/** Home page for a signed-in account. */
export function homeFor(role: Role, hasInterests: boolean): string {
  if (role === 'admin') return '/admin';
  return hasInterests ? '/opportunities' : '/onboarding/interests';
}

/** Pages that need a signed-in account (optionally of a given role). */
export function RequireAuth({ role, children }: { role?: Role; children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && user.role !== role) return <Navigate to={homeFor(user.role, user.interests.length > 0)} replace />;
  if (!role && user.role === 'admin' && !location.pathname.startsWith('/admin')) {
    // admins use the admin panel; shared pages (privacy) are allowed
    return <>{children}</>;
  }
  return <>{children}</>;
}

/** Login / registration pages are pointless once signed in. */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (user) return <Navigate to={homeFor(user.role, user.interests.length > 0)} replace />;
  return <>{children}</>;
}
