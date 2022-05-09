import { useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";

import { JournalScreen } from "../components/journal/JournalScreen";
import { LoadingScreen } from "../components/LoadingScreen";

export const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Router>
      <Switch>
        <PublicRoute
          isAuthenticated={isLoggedIn}
          path="/auth"
          component={AuthRouter}
        />

        <PrivateRoute
          exact
          isAuthenticated={isLoggedIn}
          path="/"
          component={JournalScreen}
        />

        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
