import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <Header /> 
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home Page */}
                <Route path="/signin" element={<SignIn />} /> {/* Sign In Page */}
                <Route path="/signup" element={<SignUp />} /> {/* Sign Up Page */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} /> {/* Protected Dashboard */}
                </Route>
                
                {/* Add other public or protected routes here */}
            </Routes>
             <Footer />
        </Router>
    </div>
  );
}

export default App;
