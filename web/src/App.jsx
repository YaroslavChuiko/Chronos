import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CalendarPage from './pages/Calendars/Calendars';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';
import { useRefreshMutation } from './store/api/authSlice';
import Loader from './components/Loader/Loader';
import ConfirmEmail from './pages/ConfirmPages/ConfirmEmail';
import ConfirmCalendar from './pages/ConfirmPages/ConfirmCalendar';
import ConfirmEvent from './pages/ConfirmPages/ConfirmEvent';
import CreateEvent from './pages/CreateEvent/CreateEvent';

const App = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [refresh, { isLoading, error }] = useRefreshMutation();

  useEffect(() => {
    if (!user.id && accessToken) {
      refresh();
    }
  }, [refresh, user.id, accessToken]);

  if (isLoading || (!user.id && !error && accessToken)) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/createEvent" element={<CreateEvent />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/confirm-calendar" element={<ConfirmCalendar />} />
        <Route path="/confirm-event" element={<ConfirmEvent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
