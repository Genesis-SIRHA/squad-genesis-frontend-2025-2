import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Navbar, Header} from './components';
import DashBoard from "./pages/Student/dashboard/StudentDashboard.tsx";
import LoginPage from './pages/login-page';
import {ProtectedRoute} from './components/ProtectedRoute';
import {AuthProvider} from './context/AuthProvider';
import {ToastContainer} from "react-toastify";
import Pensum from "@/pages/Student/Pensum/Pensum.tsx";

function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="*" element={
                            <div className="flex h-screen bg-pattern-foreground overflow-hidden">
                                <Navbar/>
                                <div className="flex-1 flex flex-col min-w-0">
                                    <Header/>
                                    <main className="flex-1 mr-4 mb-4 rounded-4xl bg-foreground overflow-auto">
                                        <ToastContainer
                                            position="bottom-right"
                                            autoClose={3000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="light"
                                            toastClassName="rounded-lg shadow-md"
                                        />
                                        <div className="h-full w-full">
                                            <Routes>
                                                <Route path="/dashboard" element={<DashBoard/>}/>
                                                <Route path="/pensum" element={<Pensum/>}/>
                                                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                                            </Routes>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        }/>
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;