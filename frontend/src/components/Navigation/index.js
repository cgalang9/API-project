import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index.js';
import * as sessionActions from '../../store/session';
import './Navigation.css';


function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser && Object.keys(sessionUser).length === 0) {
        dispatch(sessionActions.logout());
    }
  }, [dispatch, sessionUser])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/create-spot' className='become-host-container'>Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className='sign-up-link'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='nav'>
        <div className='favicon'>
          <NavLink exact to="/"><img src='favicon.png' alt='favicon' /></NavLink>
        </div>
      <li className='nav_links'>
      <NavLink exact to="/" className='home-link'>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
