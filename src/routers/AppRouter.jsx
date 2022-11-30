import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { firebaseApp } from "services/firebase";
import { login } from "store/actions/auth";
import { startLoadingNotes } from "store/actions/notes";
import { PrivateRoute } from "routers/PrivateRoute";
import { PublicRoute } from "routers/PublicRoute";
import { AuthRouter } from "routers/AuthRouter";

import { Loader } from "components/Loader";
import { JournalScreen } from "pages/JournalScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.photoURL));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
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
