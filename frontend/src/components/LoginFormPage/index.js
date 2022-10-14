import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(data.errors)
        } else if (data.message) {
            setErrors([data.message])
        }
      });
  }

  return (
    <div className='login_form_container flex'>
        <form onSubmit={handleSubmit} className='login_form flex' >
          <div className='title'>Log in</div>
          <div className='welcome'>Welcome to Airbnb</div>
          <ul className='errors'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className='flex'>
            <span className='input_label'>Username or Email</span>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className='input_top'
            />
          </label>
          <label className='flex'>
            <span className='input_label'>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='input_bottom'
            />
          </label>
          <button type="submit" className='login_btn'>Log In</button>
        </form>
    </div>
  );
}

export default LoginFormPage;
