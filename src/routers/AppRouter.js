import { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { firebaseApp } from "../firebase/config";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";

import { JournalScreen } from "../components/journal/JournalScreen";
import { LoadingScreen } from "../components/LoadingScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

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
