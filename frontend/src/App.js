import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsDisplay from "./components/SpotsDisplay";
import CreateSpotForm from "./components/CreateSpotForm";
import SpotDetailsMainPage from "./components/SpotDetailsMainPage";
import ReivewsCurrentUser from "./components/ReivewsCurrentUser";
import EditReviewForm from "./components/EditReviewForm";
import CreateReviewForm from "./components/CreateReviewForm";
import BookingConfirmation from "./components/CreateBookingTile/BookingConfirmation";
import BookingsCurrentUser from "./components/BookingsCurrentUser";

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
          <Route exact path="/spots/:spotId/reviews/new">
            <CreateReviewForm />
          </Route>
          <Route exact path="/spots/:spotId/booking-confirmation">
            <BookingConfirmation />
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
          <Route path="/current-user/bookings">
            <BookingsCurrentUser />
          </Route>
          <Route path='/404'>
            <h1 style={{ marginTop: 125, textAlign: "center" }}>404: Page Not Found</h1>
            <div style={{ textAlign: "center" }}><NavLink exact to="/">Home</NavLink></div>
          </Route>
          <Route path='/403'>
            <h1 style={{ marginTop: 125, textAlign: "center" }}>403: Forbidden</h1>
            <div style={{ textAlign: "center" }}><NavLink exact to="/">Home</NavLink></div>
          </Route>
          <Route>
            <h1 style={{ marginTop: 125, textAlign: "center" }}>Page Not Found</h1>
            <div style={{ textAlign: "center" }}><NavLink exact to="/">Home</NavLink></div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
