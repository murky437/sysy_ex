import styles from './LoginPage.module.css';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/authContext.tsx';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username && password) {
      login(username, password);
      setUsername('');
      setPassword('');
      navigate('/');
    } else {
      alert('Please fill in both fields');
    }
  };
  return (
    <div className={styles.loginPage}>
      <h2>Please log in</h2>
      <div className={styles.infoText}>
        (Use any credentials, it is not connected to API yet)
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formRow">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formRow">
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}

export { LoginPage };
