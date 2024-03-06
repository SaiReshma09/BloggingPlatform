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
  const [password, setPassword] = useState('');const [usernameError, setUsernameError] = useState(false); // State variable for username error
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
    if (username === 'admin' && password === 'root') {
      // If correct, grant access and redirect to blog page
      localStorage.setItem('login', 'admin');
      navigate('/'); // Redirect to the blog page
    } else if (username === 'moderator' && password === 'mpass') {
      // If correct, grant access and redirect to blog page
      localStorage.setItem('login', 'moderator');
      navigate('/'); // Redirect to the blog page
    } else if (username === 'student' && password === 'spass') {
      // If correct, grant access and redirect to blog page
      localStorage.setItem('login', 'student');
      navigate('/'); // Redirect to the blog page
    } else {
      // If incorrect, display error message
      setError('Incorrect username or password');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '50%', marginTop: '16px' }}>
      <Typography variant="h5" gutterBottom>Login</Typography> {/* Login heading */}
      {error && (
        <Card style={{ marginBottom: '16px' }}>
          <CardContent>{error}</CardContent>
        </Card>
      )}
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '50%', marginTop: '16px' }}>
      <TextField
        style={{ marginBottom: '8px' }}
        label="Username"
        variant="outlined"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
        error={usernameError} // Show error if username is empty
        helperText={usernameError ? 'Username is required' : ''}
      />
      <TextField
        style={{ marginBottom: '8px' }}
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError} // Show error if password is empty
        helperText={passwordError ? 'Password is required' : ''}
      />
      <Button
        style={{ marginTop: '8px' }}
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </form>
    </div>
  );
}

export default Login;
