import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginImage from '../images/loginImage.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(email);
    const MIN_LENGTH = 6;
    const passwordValidation = password.length > MIN_LENGTH;
    const validate = emailValidation && passwordValidation;
    setDisabled(!validate);
  }, [email, password]);

  const handleButton = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <main
      className="d-flex justify-content-center flex-column align-items-center divSize"
    >
      <h1>Tryberinha</h1>
      <div className="d-flex align-items-end">
        <img
          className="loginImage"
          src={ LoginImage }
          alt=""
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="email"
          className="form-label"
        >
          Email
          <input
            type="email"
            className="form-control"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
      </div>
      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
        >
          Senha
          <input
            id="password"
            type="password"
            className="form-control"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
      </div>
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ handleButton }
          className="btn btn-primary"
        >
          Enter
        </button>
      </Link>
    </main>
  );
}

export default Login;
