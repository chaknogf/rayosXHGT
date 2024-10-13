import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import './login.css';
import HomeComponent from '../home/home';

interface User {
  username: string;
  password: string;
}

const mockUsers: User[] = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
];

const LoginComponent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  //const navigate = useNavigate();
    

  useEffect(() => {
    logout();
  }, []);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = mockUsers.find((u) => u.username === username && u.password === password);
    if (user) {
      const token = 'dummy-token'; // Simulated token
      // Store token in cookie and local storage
      document.cookie = `token=${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
  
      setIsAuthenticated(true); // Establece el estado de autenticación en verdadero
  
      // Si deseas redirigir a '/home', deja la siguiente línea, de lo contrario puedes omitirla
      // navigate('/home');
    } else {
      setError('Invalid username or password');
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <div className="containerForm">
      
      {!isAuthenticated ? (
        <div className="container">
          <div className="login-box">
          <h3 className='title-login'>SysHosp</h3>
            <form onSubmit={login} autoComplete="off">
              <div className="user-box">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  autoComplete="off"
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  autoComplete="off"
                />
                <label>Password</label>
              </div>
              {error && <p className="error">{error}</p>}
              <button className="btn" type="submit">
                LogIn
                <span></span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <HomeComponent /> // Renderiza TablaPacientes si el usuario está autenticado
      )}
    </div>
  );
  
};

export default LoginComponent;
