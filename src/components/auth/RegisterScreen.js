import Alert from "../Alert";

export const RegisterScreen = () => {
  return (
    <main class="auth__main">
      <div className="auth__box-container">
        <h1 class="auth__title center">Register</h1>
        <form>
          {/* <Alert type="error" description="Passwords doesn't match" /> */}
          <input
            className="auth__input"
            id="name"
            name="name"
            placeholder="Enter name..."
            type="text"
          />
          <input
            className="auth__input"
            id="email"
            name="email"
            placeholder="Enter email..."
            type="email"
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            placeholder="Enter password..."
            type="password"
          />
          <input
            className="auth__input"
            id="password2"
            name="password2"
            placeholder="Confirm password..."
            type="password"
          />
          <button className="btn btn-primary btn-block" type="submit">
            Register
          </button>
          <small class="d-block mt-2">
            Already registered? <a className="link">Login</a>
          </small>
        </form>
      </div>
    </main>
  );
};
