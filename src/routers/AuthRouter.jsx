import { Switch, Route, Redirect } from "react-router-dom";

import { LoginScreen } from "pages/LoginScreen";
import { RegisterScreen } from "pages/RegisterScreen";

export const AuthRouter = () => {
  return (
    <main className="auth__main">
      <div className="auth__box-container">
        <div className="animate__animated animate__fadeIn animate__fast">
          <Switch>
            <Route exact path="/auth/login" component={LoginScreen} />

            <Route exact path="/auth/register" component={RegisterScreen} />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </div>
    </main>
  );
};
