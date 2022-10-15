import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsDisplay from "./components/SpotsDisplay";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import SpotDetailsMainPage from "./components/SpotDetailsMainPage";

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
          <Route path="/spots/:spotId">
            <SpotDetailsMainPage />
          </Route>
          <Route path="/create-spot">
            <CreateSpotForm />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/deletion-successful">
            <h1 style={{ marginTop: 125, textAlign: "center" }}>Spot Succesfully Deleted</h1>
          </Route>
          <Route>
            <h1 style={{ marginTop: 125, textAlign: "center" }}>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
