import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashBoard from "./pages/Student/dashboard/StudentDashboard.tsx";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-foreground">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
