import React, { useState } from 'react';
import './App.css';
import User from './components/user/User';

function App() {
  const [fimilar, setFimilar] = useState(false);
  return (
    <div className='App'>
      <h2>Is Fimilar: {fimilar.toString()}</h2>
      <button onClick={()=>setFimilar(!fimilar)}>Toggle Friend</button>
      <User fimilar={fimilar}></User>
    </div>
  );
}

export default App;
