import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import Alert from "components/Alert";
import { useForm } from "hooks/useForm";
import {
  startGithubLogin,
  startGoogleLogin,
  startLoginWithEmailPassword,
} from "store/actions/auth";
import { removeError, setError } from "store/actions/ui";
import googleLogo from "assets/images/google-logo.svg";
import githubLogo from "assets/images/github-logo.svg";

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

  const handleGithubLogin = () => {
    dispatch(startGithubLogin());
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
                src={googleLogo}
                alt="google button"
              />
            </div>
            <p className="social-text">Google</p>
          </div>
          <div
            className="btn btn-social btn-github"
            disabled={loading}
            onClick={handleGithubLogin}
          >
            <div className="social-icon-wrapper">
              <img
                className="social-icon"
                src={githubLogo}
                alt="github button"
              />
            </div>
            <p className="social-text">Github</p>
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
