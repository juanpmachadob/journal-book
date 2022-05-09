import { IoPersonCircle, IoLogOutOutline } from "react-icons/io5";
import { JournalEntries } from "./JournalEntries";

export const JournalSidebar = () => {
  return (
    <aside className="journal__sidebar">
      <header className="journal__sidebar-navbar">
        <div className="journal__sidebar-navbar__user">
          <IoPersonCircle />
          <span>Juan Pablo Machado</span>
        </div>
        <IoLogOutOutline className="icon" title="Log Out" />
      </header>
      <JournalEntries />
    </aside>
  );
};
