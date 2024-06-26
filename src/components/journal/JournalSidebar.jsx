import { IoPersonCircle, IoLogOutOutline, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "store/actions/auth";
import { JournalEntries } from "components/journal/JournalEntries";
import { toggleMobileSidebar } from "store/actions/ui";

export const JournalSidebar = () => {
  const { name, photoUrl } = useSelector((state) => state.auth);
  const { mobileSidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleMobileSidebar());
  };

  return (
    <aside
      className={`journal__sidebar ${mobileSidebarOpen ? "mobile-menu" : ""}`}
    >
      <header className="journal__sidebar-navbar">
        <div className="journal__sidebar-navbar__user">
          {photoUrl && (
            <img
              className="journal__sidebar-navbar__user-photo"
              src={photoUrl}
              alt={name}
            />
          )}
          {!photoUrl && <IoPersonCircle size={38} />}
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
          onClick={handleToggleSidebar}
        />
      </header>
      <JournalEntries />
    </aside>
  );
};
