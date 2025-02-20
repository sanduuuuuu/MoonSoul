import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Common/HomePage';
import ShopPage from './pages/Customer/ShopPage';
import AuthModel from './api/AuthModal';
// import CartSection from './components/UI/CartSection';  
// import SearchSection from './components/UI/SearchSection';
import UserProfile from './pages/Common/UserprofilePage'; // Adjust the path as necessary


// import LoginPage from './pages/LoginPage.tsx';
// import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<AuthModel onClose={() => console.log('Modal closed')} />} />
      <Route path= "/shop" element={<ShopPage />} />
      <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;