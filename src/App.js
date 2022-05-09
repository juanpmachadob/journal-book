import { LoginScreen } from "./components/auth/LoginScreen";
import { RegisterScreen } from "./components/auth/RegisterScreen";
import { JournalScreen } from "./components/journal/JournalScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { AppRouter } from "./routers/AppRouter";

export const App = () => {
  return <AppRouter />;
};
