import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import Alert from "components/Alert";
import { useForm } from "hooks/useForm";
import { startRegisterWithEmailPasswordName } from "store/actions/auth";
import { removeError, setError } from "store/actions/ui";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required."));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid."));
      return false;
    } else if (
      !validator.isStrongPassword(password.toString()) ||
      password.length > 32
    ) {
      dispatch(
        setError(
          "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase."
        )
      );
      return false;
    } else if (password !== password2) {
      dispatch(setError("Passwords should match."));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h1 className="auth__title center">Register</h1>
      <form onSubmit={handleRegister}>
        {msgError && <Alert type="error" description={msgError} />}
        <input
          className="auth__input"
          id="name"
          name="name"
          placeholder="Enter name..."
          type="text"
          onChange={handleInputChange}
          value={name}
        />
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
        <input
          className="auth__input"
          id="password2"
          name="password2"
          placeholder="Confirm password..."
          type="password"
          onChange={handleInputChange}
          value={password2}
        />
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Register
        </button>
        <small className="d-block mt-2">
          Already registered?{" "}
          <Link className="link" to="/auth/login">
            Login
          </Link>
        </small>
      </form>
    </>
  );
};
