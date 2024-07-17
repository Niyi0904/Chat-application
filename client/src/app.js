import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Join from './component/Join/join';
import Chat from './component/Chat/chat';

const App = () => (
  <Routes>
    <Route path='/' exact Component={Join}/>
    <Route path='/chat' exact Component={Chat}/>
  </Routes>
);

export default App;
