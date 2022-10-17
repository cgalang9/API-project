import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsDisplay from "./components/SpotsDisplay";
import CreateSpotForm from "./components/CreateSpotForm";
import SpotDetailsMainPage from "./components/SpotDetailsMainPage";
import ReivewsCurrentUser from "./components/ReivewsCurrentUser";
import EditReviewForm from "./components/EditReviewForm";
import CreateReviewForm from "./components/CreateReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsDisplay />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/:spotId/reviews/new">
            <CreateReviewForm />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetailsMainPage />
          </Route>
          <Route path="/create-spot">
            <CreateSpotForm />
          </Route>
          <Route exact path='/current-user/reviews/:reviewId/edit'>
              <EditReviewForm />
          </Route>
          <Route path="/current-user/reviews">
            <ReivewsCurrentUser />
          </Route>
          <Route path="/deletion-successful">
            <h1 style={{ marginTop: 125, textAlign: "center" }}>Succesfully Deleted</h1>
            <NavLink exact to="/">Home</NavLink>
          </Route>
          <Route>
            <h1 style={{ marginTop: 125, textAlign: "center" }}>Page Not Found</h1>
            <NavLink exact to="/">Home</NavLink>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
