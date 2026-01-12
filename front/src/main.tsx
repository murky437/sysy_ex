import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HomePage } from './pages/HomePage.tsx';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { LoginPage } from './pages/LoginPage.tsx';
import { AuthProvider, useAuth } from './auth/authContext.tsx';

// Layout wrapper for protected routes
// eslint-disable-next-line react-refresh/only-export-components
const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />; // renders nested routes
};

// Layout wrapper for public routes
// eslint-disable-next-line react-refresh/only-export-components
const PublicLayout = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/" replace />;
  return <Outlet />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
