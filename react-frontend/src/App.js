// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/signup', formData);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error signing up.');
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/login', formData);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error logging in.');
//     }
//   };

//   return (
//     <div>
//       <h1>Login & Signup</h1>
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//       />
//       <button onClick={handleSignup}>Sign Up</button>
//       <button onClick={handleLogin}>Login</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/signup', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error signing up.');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', formData);
      setMessage(res.data.message);
  
      if (res.data.message === "Login successful!") {
        // Redirect to home page
        window.location.href = "/home";
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error logging in.');
    }
  };
  

  return (
    <div>
      <h1>Login & Signup</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
