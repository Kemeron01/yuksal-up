import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import { GuestOnly, RequireAuth } from '@/components/RouteGuards';
import { AdminProvider } from '@/data/admin';
import { AuthProvider } from '@/data/auth';
import { SubmissionsProvider } from '@/data/challenges';
import { SavedProvider } from '@/data/saved';
import { I18nProvider } from '@/i18n';
import { AdminChallengesPage, AdminOpportunitiesPage } from '@/pages/admin/ContentListPages';
import { ChallengeEditorPage } from '@/pages/admin/ChallengeEditorPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { OpportunityEditorPage } from '@/pages/admin/OpportunityEditorPage';
import { ReviewQueuePage, ReviewSolutionPage } from '@/pages/admin/ReviewPages';
import { UserDetailPage } from '@/pages/admin/UserDetailPage';
import { UsersPage } from '@/pages/admin/UsersPage';
import { InterestsPage } from '@/pages/auth/InterestsPage';
import { LinkExpiredPage, ResetLinkSentPage, VerifyEmailPage } from '@/pages/auth/MessageSentPages';
import { ForgotPasswordPage, NewPasswordPage, PasswordResetSuccessPage } from '@/pages/auth/PasswordPages';
import { RegistrationPage } from '@/pages/auth/RegistrationPage';
import { SignInPage } from '@/pages/auth/SignInPage';
import { LandingPage } from '@/pages/landing/LandingPage';
import { PrivacyPage } from '@/pages/profile/PrivacyPage';
import { ProfileInterestsPage } from '@/pages/profile/ProfileInterestsPage';
import { ProfilePersonalPage } from '@/pages/profile/ProfilePersonalPage';
import { ProfileSettingsPage } from '@/pages/profile/ProfileSettingsPage';
import { PasswordChangePage } from '@/pages/profile/PasswordChangePage';
import { CalendarPage } from '@/pages/student/CalendarPage';
import { ChallengeBriefPage } from '@/pages/student/ChallengeBriefPage';
import { ChallengeFormPage } from '@/pages/student/ChallengeFormPage';
import { ChallengeSolutionPage } from '@/pages/student/ChallengeSolutionPage';
import { ChallengesPage } from '@/pages/student/ChallengesPage';
import { OpportunitiesPage } from '@/pages/student/OpportunitiesPage';
import { OpportunityDetailPage } from '@/pages/student/OpportunityDetailPage';
import { SavedPage } from '@/pages/student/SavedPage';
import { UiKitPage } from '@/pages/ui-kit/UiKitPage';

/** Every navigation starts at the top of the page. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const student = (el: ReactNode) => <RequireAuth role="student">{el}</RequireAuth>;
const admin = (el: ReactNode) => <RequireAuth role="admin">{el}</RequireAuth>;

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <SavedProvider>
          <SubmissionsProvider>
            <AdminProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* public */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/ui" element={<UiKitPage />} />

                  {/* authentication */}
                  <Route path="/register" element={<GuestOnly><RegistrationPage /></GuestOnly>} />
                  <Route path="/login" element={<GuestOnly><SignInPage /></GuestOnly>} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route path="/link-expired" element={<LinkExpiredPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-link-sent" element={<ResetLinkSentPage />} />
                  <Route path="/new-password" element={<NewPasswordPage />} />
                  <Route path="/password-reset" element={<PasswordResetSuccessPage />} />
                  <Route path="/onboarding/interests" element={student(<InterestsPage />)} />

                  {/* student app */}
                  <Route path="/opportunities" element={<OpportunitiesPage />} />
                  <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
                  <Route path="/saved" element={student(<SavedPage />)} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/challenges/:id" element={<ChallengeBriefPage />} />
                  <Route path="/challenges/:id/submit" element={student(<ChallengeFormPage />)} />
                  <Route path="/challenges/:id/solution" element={student(<ChallengeSolutionPage />)} />
                  <Route path="/calendar" element={student(<CalendarPage />)} />
                  <Route path="/profile" element={student(<ProfilePersonalPage />)} />
                  <Route path="/profile/interests" element={student(<ProfileInterestsPage />)} />
                  <Route path="/profile/settings" element={student(<ProfileSettingsPage />)} />
                  <Route path="/profile/password" element={student(<PasswordChangePage />)} />

                  {/* admin */}
                  <Route path="/admin" element={admin(<DashboardPage />)} />
                  <Route path="/admin/users" element={admin(<UsersPage />)} />
                  <Route path="/admin/users/:id" element={admin(<UserDetailPage />)} />
                  <Route path="/admin/opportunities" element={admin(<AdminOpportunitiesPage />)} />
                  <Route path="/admin/opportunities/new" element={admin(<OpportunityEditorPage />)} />
                  <Route path="/admin/opportunities/:id/edit" element={admin(<OpportunityEditorPage />)} />
                  <Route path="/admin/challenges" element={admin(<AdminChallengesPage />)} />
                  <Route path="/admin/challenges/new" element={admin(<ChallengeEditorPage />)} />
                  <Route path="/admin/challenges/:id/edit" element={admin(<ChallengeEditorPage />)} />
                  <Route path="/admin/reviews" element={admin(<ReviewQueuePage />)} />
                  <Route path="/admin/reviews/:email/:challengeId" element={admin(<ReviewSolutionPage />)} />
                  <Route path="/admin/reviews/:email/:challengeId/published" element={admin(<ReviewSolutionPage published />)} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </AdminProvider>
          </SubmissionsProvider>
        </SavedProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
