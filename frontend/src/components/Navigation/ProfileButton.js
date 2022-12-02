import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
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

  const logout = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(history.push('/'))
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
          <NavLink to='/current-user/bookings' className='dropdown_menu_link'>Trips</NavLink>
          <NavLink to='/create-spot' className='dropdown_menu_link'>Host Your Home</NavLink>
          <NavLink to='/current-user/reviews' className='dropdown_menu_link'>Reviews</NavLink>
          <li className='logout_btn_container'>
            <button onClick={logout} className='logout_btn'>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
