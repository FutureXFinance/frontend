import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/", 
      element: <><Header /><Home /><Footer /></>
    },
    {
      path: "/login",
      element: <><LoginSignup /></>
    }
  ])
  return (
    <div className="App">
      {/* <Header />
      <Home />
      <Footer />
      <LoginSignup /> */}
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;