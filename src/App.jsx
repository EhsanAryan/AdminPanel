import AdminLayout from './layouts/admin/AdminLayout';
import './App.css';
import AuthLayout from './layouts/auth/AuthLayout';
import { useLocation } from 'react-router-dom';
import 'animate.css';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      {location.pathname.includes("/auth/") ? (
        <AuthLayout />
      ) : (
        <AdminLayout />
      )}
    </Provider>
  );
}

export default App;