import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Alert from "../Alert";
import { useForm } from "../../hooks/useForm";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    name: "Juan",
    email: "juan@test.com",
    password: 123456,
    password2: 123456,
  });
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    //TODO: Validations
    dispatch(startRegisterWithEmailPasswordName(email, password, name))
  };

  return (
    <>
      <h1 className="auth__title center">Register</h1>
      <form onSubmit={handleRegister}>
        {/* <Alert type="error" description="Passwords doesn't match" /> */}
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
        <button className="btn btn-primary btn-block" type="submit">
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
