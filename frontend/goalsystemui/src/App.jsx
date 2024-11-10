import './App.css';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/login/Login';


const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}
      />
      {/* <Route path="/user-panel" element=
          {
            <PrivateRoute accessLevel={['0', '1', '2']}>
              <UserPanel />
            </PrivateRoute>
          } 
        /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}

export default App;
