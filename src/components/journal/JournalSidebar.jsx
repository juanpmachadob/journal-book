import { IoPersonCircle, IoLogOutOutline, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "store/actions/auth";
import { JournalEntries } from "components/journal/JournalEntries";

export const JournalSidebar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleCloseSidebar = () => {};

  return (
    <aside className={`journal__sidebar mobile-menu animate__bounceInLeft`}>
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
        <IoClose
          className="icon icon--close"
          title="Close sidebar"
          onClick={handleCloseSidebar}
        />
      </header>
      <JournalEntries />
    </aside>
  );
};
