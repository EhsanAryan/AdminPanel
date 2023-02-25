import AdminLayout from './layouts/admin/AdminLayout';
import './App.css';
import AuthLayout from './layouts/auth/AuthLayout';
import { useLocation } from 'react-router-dom';
import 'animate.css';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("/auth/") ? (
        <AuthLayout />
      ) : (
        <AdminLayout />
      )}
    </>
  );
}

export default App;