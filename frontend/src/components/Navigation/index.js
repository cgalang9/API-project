import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/index.js';
import SignupFormModal from '../SignupFormModal';
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
        <NavLink to='/create-spot' className='become-host-container'><span style={{ color: 'black' }}>Become a Host</span></NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul className='nav'>
        <div className='favicon'>
          <NavLink exact to="/"><img src='/favicon.png' alt='favicon' /></NavLink>
        </div>
      <li className='nav_links'>
      <NavLink exact to="/" className='home-link'><span style={{ color: 'black' }}>Home</span></NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
