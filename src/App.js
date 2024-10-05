import React, { useState, useEffect } from 'react';
import './App.css'; 


const StorageComponent = () => {
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem('counter');
    return savedCounter !== null ? Number(savedCounter) : 0;
  });

  const [email, setEmail] = useState(() => sessionStorage.getItem('email') || '');
  const [password, setPassword] = useState(() => sessionStorage.getItem('password') || '');

  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const saveCredentials = () => {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
  };

  // Update localStorage whenever counter changes
  useEffect(() => {
    localStorage.setItem('counter', counter);
  }, [counter]);

  // Clear sessionStorage when the component is unmounted (tab is closed)
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('password');
    };
  }, []);

  return (
    <div  style={{ padding: '20px' }}>
      {/* Counter */}
      <h2>Counter</h2>

      <div className='counter'>
        <p>Counter Value: {counter}</p>
        <button  className="increment"onClick={incrementCounter}>Increment Counter</button>
      </div>

      {/* Email and Password */}
      <div style={{ marginTop: '20px' }}>
        <h2>Email & Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button onClick={saveCredentials}>Save Credentials</button>
      </div>
    </div>
  );
};

export default StorageComponent;
