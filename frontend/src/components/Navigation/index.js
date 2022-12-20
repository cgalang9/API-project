import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal/index.js";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser && Object.keys(sessionUser).length === 0) {
      dispatch(sessionActions.logout());
    }
  }, [dispatch, sessionUser]);

  const demoUserLogin = () => {
    const demoUser = {
      credential: "demo@user.io",
      password: "password",
    };
    return dispatch(sessionActions.login(demoUser)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        alert("There was an error logging in.", data.errors);
      } else if (data.message) {
        alert("There was an error logging in.", data.message);
      }
    });
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/create-spot" className="become-host-container">
          <span style={{ color: "black" }}>Become a Host</span>
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button type="button" className="log-in-btn" onClick={demoUserLogin}>
          Log In As Demo User
        </button>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul className="nav">
      <div className="favicon">
        <NavLink exact to="/">
          <img src="/favicon.png" alt="favicon" />
        </NavLink>
        <div className="get_in_touch">
          <div>Get in Touch :</div>
          <div className="get_in_touch_icon_wrapper">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/cgalang9"
            >
              <div className="get_in_touch_icon">
                <i className="fa-brands fa-github" />
              </div>
              <div className="get_in_touch_icon_text">Github</div>
            </a>
          </div>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/carmelino-galang-53369a205/"
            >
              <div className="get_in_touch_icon">
                <i className="fab fa-linkedin-in" />
              </div>
              <div className="get_in_touch_icon_text">LinkedIn</div>
            </a>
          </div>
        </div>
      </div>
      <li className="nav_links">
        <NavLink exact to="/" className="home-link">
          <span style={{ color: "black" }}>Home</span>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
