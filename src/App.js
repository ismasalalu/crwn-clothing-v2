import React from 'react';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.compoment';
import Navigation from './routes/navigation/navigation.component';
import { Route, Routes } from 'react-router-dom';

const Shop = () => {
  return (
    <div>
      <h1>This is shop</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        
        <Route index element={<Home />} />
        
        <Route path="shop" element={<Shop />} />
      
        <Route path="auth" element={<Authentication />} />

      </Route>
    </Routes>
  );
};

export default App;
