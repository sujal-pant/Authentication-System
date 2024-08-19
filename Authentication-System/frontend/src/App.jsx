import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Floatingshape from './Component/Floatingshape';
import { LoginPage } from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import EmailVerification from './Pages/EmailVerification';
import DashboardPage from './Pages/DashboardPage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './Auth/authStore';
import LoadingSpinner from './Component/LoadingSpinner';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';

function App() {
  const { isCheckingAuth, isAuthenticated, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // RedirectAuthenticatedUser component to handle redirection based on authentication
  const RedirectAuthenticatedUser = ({ children }) => {
    if (isAuthenticated && user?.isVerified) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  // ProtectedRoute component to handle protected routes
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore(); 
    console.log('Authenticated:', isAuthenticated);
    console.log('User Verified:', user?.isVerified); 
  
    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }
  
    if (!user?.isVerified) {
      return <Navigate to='/verify-route' replace />;
    }
  
    return children;
  };
  if (isCheckingAuth) return <LoadingSpinner />;


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <Floatingshape 
        color="bg-green-500"
        size="w-16 h-64"
        top="-5%"
        left="10%"
        delay={0}  
      />
      <Floatingshape 
        color="bg-green-500"
        size="w-48 h-47"
        top="80%"
        left="80%"
        delay={5} 
      />
      <Floatingshape 
        color="bg-green-500"
        size="w-32 h-23"
        top="40%"
        left="-10%"
        delay={2}  
      />
      
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-route' element={<EmailVerification />} />
        <Route
					path='/forgot-password'
					element={
							<ForgotPasswordPage />
					}
          
				/>
        	<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
