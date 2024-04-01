import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false); // State variable for username error
  const [passwordError, setPasswordError] = useState(false); // State variable for password error
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = () => {
    setUsernameError(false);
    setPasswordError(false);
    setError('');
    // Check if username and password are correct
    if (username.trim() === '') {
      setUsernameError(true);
      return;
    }
    if (password.trim() === '') {
      setPasswordError(true);
      return;
    }

    if (username === 'admin' && password === 'admin') {
      // If correct, grant access and redirect to blog page
      localStorage.setItem('user', 'admin');
      localStorage.setItem('login', true);
      navigate('/'); // Redirect to the blog page
    } else{

    // Retrieve users from local storage and parse JSON string
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users || !Array.isArray(users)) {
      setError('Login failed, please contact admin');
      return;
    }
    const foundUser = users.find(user => user.username === username);
    if(foundUser){
      if(foundUser.enabled){
    
          if (username === 'kevin' && password === 'mode') {
            // If correct, grant access and redirect to blog page
            localStorage.setItem('kevin', 'moderator');
            localStorage.setItem('user', 'kevin');
            localStorage.setItem('login', true);
            navigate('/'); // Redirect to the blog page
          } else if (username === 'reshma' && password === 'student') {
            // If correct, grant access and redirect to blog page
            localStorage.setItem('user', 'reshma');
            localStorage.setItem('login', true);
            navigate('/'); // Redirect to the blog page
          } else {
            // If incorrect, display error message
            setError('Incorrect username or password');
          }
        }
          else {
            // User is disabled, display error message
            setError('Your account has been disabled. Please contact the administrator.');
          }
      } else {
        // User not found, display error message
        setError('User not found. Please check your username.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <div style={{ width: '50%', maxWidth: '400px', marginTop: '16px' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '16px' }}>
        Login
      </Typography>
      {error && (
        <Card style={{ width: '100%', marginBottom: '16px' }}>
          <CardContent>{error}</CardContent>
        </Card>
      )}
      <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          style={{ marginBottom: '16px', width: '100%' }}
          label="Username"
          variant="outlined"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
          helperText={usernameError ? 'Username is required' : ''}
        />
        <TextField
          style={{ marginBottom: '16px', width: '100%' }}
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError ? 'Password is required' : ''}
        />
        <Button
          style={{ marginTop: '16px', width: '100%' }}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </div>
  </div>
  
  );
}

export default Login;
