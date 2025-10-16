import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import type {ReactElement} from 'react';

const App = (): ReactElement => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Agrega más rutas aquí según sea necesario */}
      </Routes>
    </div>
  );
};

export default App;
