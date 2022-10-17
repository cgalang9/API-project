import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="user_icon_container">
      <button onClick={openMenu} className="user_btn">
        <span className="menu_icon"> <i className="fa-sharp fa-solid fa-bars" /></span>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="username-dropdown"><span style={{fontSize: 14}}>{user.username}</span></li>
          <li className="email-dropdown"><span style={{fontSize: 12, marginTop: 5}}>{user.email}</span></li>
          <hr />
          <NavLink to='/current-user/reviews' className='reviews-link'>Reviews</NavLink>
          <li className='logout_btn_container'>
            <button onClick={logout} className='logout_btn'>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
