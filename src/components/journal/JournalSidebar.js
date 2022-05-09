import { IoPersonCircle, IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { JournalEntries } from "./JournalEntries";

export const JournalSidebar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout())
  };

  return (
    <aside className="journal__sidebar">
      <header className="journal__sidebar-navbar">
        <div className="journal__sidebar-navbar__user">
          <IoPersonCircle />
          <span>{name}</span>
        </div>
        <IoLogOutOutline
          className="icon"
          title="Log Out"
          onClick={handleLogout}
        />
      </header>
      <JournalEntries />
    </aside>
  );
};
