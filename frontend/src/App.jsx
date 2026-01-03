import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ErrorBoundary from './components/ErrorBoundary';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';

import CitizenDashboard from './pages/CitizenDashboard';
import MyReports from './pages/MyReports';
import Updates from './pages/Updates';
import PoliticianDashboard from './pages/PoliticianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import ModeratorDashboard from './pages/ModeratorDashboard';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter basename="/SpeakUp">
          <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>

          {/* Dashboard Routes - Protected */}
          <Route path="/citizen" element={
            <ProtectedRoute role="citizen">
              <DashboardLayout entries={[
                { label: 'Home', path: '/citizen' }, 
                { label: 'My Reports', path: '/citizen/reports' },
                { label: 'Updates', path: '/citizen/updates' }
              ]} />
            </ProtectedRoute>
          }>
            <Route index element={<CitizenDashboard />} />
            <Route path="reports" element={<MyReports />} />
            <Route path="updates" element={<Updates />} />
          </Route>

          <Route path="/politician" element={
            <ProtectedRoute role="politician">
              <DashboardLayout entries={[{ label: 'Overview', path: '/politician' }, { label: 'Updates', path: '/politician/updates' }]} />
            </ProtectedRoute>
          }>
            <Route index element={<PoliticianDashboard />} />
            <Route path="updates" element={<Updates />} />
          </Route>

          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <DashboardLayout entries={[{ label: 'Users', path: '/admin' }, { label: 'Settings', path: '/admin/settings' }]} />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/moderator" element={
            <ProtectedRoute role="moderator">
              <DashboardLayout entries={[{ label: 'Review Queue', path: '/moderator' }]} />
            </ProtectedRoute>
          }>
            <Route index element={<ModeratorDashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
