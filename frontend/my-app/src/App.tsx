import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Login from './Views/Login';
import Main from './Views/Main';
import Inventory from './Views/Inventory';
import Layout from './Components/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route element={<Layout/>}>
        <Route path='/Main' element={<Main/>}/>
        <Route path='/Inventory' element={<Inventory/>}/>
      </Route>
    </Routes>
  );
}

export default App;
