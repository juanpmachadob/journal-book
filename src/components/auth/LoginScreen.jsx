import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import Alert from "components/Alert";
import { useForm } from "hooks/useForm";
import {
  startFacebookLogin,
  startGoogleLogin,
  startLoginWithEmailPassword,
} from "actions/auth";
import { removeError, setError } from "actions/ui";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const handleFacebookLogin = () => {
    dispatch(startFacebookLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid."));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h1 className="auth__title center">Login</h1>
      <form onSubmit={handleLogin}>
        <small className="d-block center">Connect with</small>
        <div className="auth__social-networks">
          <div
            className="btn btn-social btn-google"
            disabled={loading}
            onClick={handleGoogleLogin}
          >
            <div className="social-icon-wrapper">
              <img
                className="social-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="social-text">Google</p>
          </div>
          <div
            className="btn btn-social btn-facebook"
            disabled={loading}
            onClick={handleFacebookLogin}
          >
            <div className="social-icon-wrapper">
              <img
                className="social-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="facebook button"
              />
            </div>
            <p className="social-text">Facebook</p>
          </div>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        {msgError && <Alert type="error" description={msgError} />}
        <input
          className="auth__input"
          id="email"
          name="email"
          placeholder="Enter email..."
          type="email"
          onChange={handleInputChange}
          value={email}
        />
        <input
          className="auth__input"
          id="password"
          name="password"
          placeholder="Enter password..."
          type="password"
          onChange={handleInputChange}
          value={password}
        />
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Login
        </button>
        <small className="d-block mt-2">
          Not account yet?{" "}
          <Link className="link" to="/auth/register">
            Register
          </Link>
        </small>
      </form>
    </>
  );
};
