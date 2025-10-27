import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Header } from './components';
import DashBoard from "./pages/Student/dashboard/StudentDashboard.tsx";

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-pattern-foreground overflow-hidden">
                <Navbar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header />
                    <main className="flex-1 mr-4 mb-4 rounded-4xl bg-foreground overflow-auto">
                        <div className="h-full w-full">
                            <Routes>
                                <Route path="/dashboard" element={<DashBoard />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </Router>
    )
}

export default App;