//import {createUserRequest,userLoginRequest,readUserRequest} from './requests';
import "./css/style.css";
import "./css/animations.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./components/ui/Unauthorized";
import TextAnim from "./components/ui/text-anim";
import Auth from "./components/auth/auth";
import { createPortal } from "react-dom";
import Modals from "./components/modals/modals";
import NotificationBar from "./components/ui/notificationBar";
import ProfilePage from "./pages/profile";

function App() {

  const container1 = document.getElementById('modals');
  const container2 = document.getElementById('notification');

  return (
    <>
    {createPortal(<Modals />,container1)}
    {createPortal(<NotificationBar />,container2)}
      <Router>
          <Switch>
            <Route path="/" exact >
              <LandingPage />
            </Route>
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} />}
            />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <ProtectedRoute exact path="/home" component={HomePage} />
            <ProtectedRoute exact path="/profile" component={ProfilePage} />
            <ProtectedRoute exact path="/text-anim" component={TextAnim} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
