import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function Signup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [load,setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoad(false);
    } else {
      setError('');
      const data = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Password: password,
      };
      try {
        const res = await axios.post("https://server-gsw0.onrender.com/get_data", data);
        alert(res.data);
        if(res.data.localeCompare('Successful') === 0){
          navigate('/');
        }
        else{
          setLoad(false);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(data);
    }
  };

  return (
    <div style={{ marginBottom: "-90%" }}>
      <div className="form-container" style={{ marginBottom: "5%" }}>
        <center><h2 style={{ fontSize: "30px" }}>Sign Up</h2></center>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="small-input"
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="small-input"
                required
              />
            </div>
          </div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" style={{ color: "black" }}>Sign Up</button>
        </form>
      </div>
      <center>
        <div style={{ paddingBottom: "10%" }}><Link to='/'>Have an account? Login</Link></div>
      </center>
      <center><div style = {{marginTop:"10%"}}>
    {load && <CircularProgress color="success" />}
    </div></center>
    </div>
  );
}

export default Signup;
