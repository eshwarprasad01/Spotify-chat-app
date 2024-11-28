import React, { useContext, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import {Context} from './Usernamecontext';

function Login() {
  const navigate = useNavigate();
  const [emailusername, setEmailusername] = useState('');
  const [password, setPassword] = useState('');
  const [load,setLoad] = useState(false);
  const {store_username} = useContext(Context);

  const onSubmit = async (e) => {
    e.preventDefault(); 
    setLoad(true);
    const data = { EmailUsername: emailusername, Password: password };
    try {
      const res = await axios.post("https://server-gsw0.onrender.com/auth", data);
      store_username(res.data.username);
      if (res.data.auth) {
        navigate('/Music');
      } else {
        alert("Invalid Credentials");
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
        <div className="form-container" style={{marginBottom:"10%"}}>
      <center><h2>Log In</h2></center>
      <form onSubmit={onSubmit}>
        <label>Email or Username</label>
        <input
          type="text"
          placeholder="Enter your email or username"
          value={emailusername}
          onChange={(e) => setEmailusername(e.target.value)}
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

        <button style={{color:"black"}}type="submit">Log In</button>
      </form>
    </div>
    <center><div><Link to='/Signup'>Don't have an account? Signup</Link></div></center>
    <center><div style = {{marginTop:"10%"}}>
    {load && <CircularProgress color="success" />}
    </div></center>
    </div>
  );
}

export default Login;
