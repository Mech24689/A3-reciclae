import React, { useEffect } from 'react';
import AppLayout from './components/layout/AppLayout'
import AppRoutes from './router'
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);  

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  )
}

export default App
