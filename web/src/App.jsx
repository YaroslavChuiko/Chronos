import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CalendarPage from './pages/Main/Main';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';
import { useRefreshMutation } from './store/api/authSlice';
import { useSelector } from 'react-redux';
import Loader from './components/Loader/Loader';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [refresh, { isLoading, error }] = useRefreshMutation();

  useEffect(() => {
    if (!user.id) {
      refresh();
    }
  }, [refresh, user.id]);

  if (isLoading || (!user.id && !error)) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<CalendarPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
