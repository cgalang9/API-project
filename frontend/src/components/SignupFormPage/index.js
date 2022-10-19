import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasstName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
                setErrors(Object.values(data.errors))
                console.log(errors)
            } else if (data.message) {
                setErrors([data.message])
            }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup_form_container flex top'>
        <form onSubmit={handleSubmit} className='signup_form flex'>
            <div className='title'>Sign up</div>
            <div className='welcome'>Welcome to Airbnb</div>
          <ul className="errors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className='flex'>
          <span className='input_label'>First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className='input_top'
            />
          </label>
          <label className='flex'>
          <span className='input_label'>Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLasstName(e.target.value)}
              required
            />
          </label>
          <label className='flex'>
          <span className='input_label'>Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className='flex'>
          <span className='input_label'>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className='flex'>
          <span className='input_label'>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className='flex'>
          <span className='input_label'>Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='input_bottom'
            />
          </label>
          <button type="submit" className="signup_btn">Sign Up</button>
        </form>
    </div>
  );
}

export default SignupFormPage;
