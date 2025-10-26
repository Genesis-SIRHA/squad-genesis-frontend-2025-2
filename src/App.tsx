import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar, Header} from './components';
import DashBoard from "./pages/Student/dashboard/StudentDashboard.tsx";

function App() {
    return (
        <Router>
            <div className="flex min-h-screen bg-pattern-foreground">
                <Navbar/>
                <div className="flex-1 min-h-screen flex flex-col">
                    <Header/>
                    <main className="flex-1 overflow-auto mr-4 mb-4 p-4 rounded-4xl bg-foreground">
                        <Routes>
                            <Route path="/dashboard" element={<DashBoard/>}/>
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    )
}

export default App;
    