import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CalendarPage from "./pages/Main/Main";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
