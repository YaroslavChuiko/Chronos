import { Route, Routes } from 'react-router-dom';
import Hello from '~/pages/Hello/Hello';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
