import { Route, Routes } from 'react-router-dom';
import Hello from '~/pages/Hello/Hello';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/test" element={<div>Test</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
