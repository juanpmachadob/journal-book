export const handleErrorMessage = (err) => {
  let message = err?.code || err.toString();

  if (err.code === "auth/account-exists-with-different-credential") {
    message = "Email already in use";
  }
  if (err.code === "auth/user-not-found") {
    message = "Email or password incorrect";
  }
  if (err.code === "auth/invalid-email") {
    message = "Email or password incorrect";
  }
  if (err.code === "auth/wrong-password") {
    message = "Email or password incorrect";
  }
  if (err.code === "auth/popup-closed-by-user") {
    message = "Log in cancelled";
  }
  if (err.code === "auth/cancelled-popup-request") {
    message = "Log in cancelled";
  }

  return message;
};
