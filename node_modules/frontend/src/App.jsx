import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Internships from "./pages/internships";
import Login from "./pages/login";
import Apply from "./pages/apply";
import Applications from "./pages/applications";
import Register from "./pages/register";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-layout">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Shared Protected Routes */}
                            <Route
                                path="/internships"
                                element={
                                    <ProtectedRoute>
                                        <Internships />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/applications"
                                element={
                                    <ProtectedRoute>
                                        <Applications />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Student-Only Routes */}
                            <Route
                                path="/apply/:id"
                                element={
                                    <ProtectedRoute allowedRoles={["student"]}>
                                        <Apply />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;