import { NoteScreen } from "../notes/NoteScreen";
import { JournalSidebar } from "./JournalSidebar";

export const JournalScreen = () => {
  return (
    <div className="journal__main">
      <JournalSidebar />
      <main className="journal__content">
        <NoteScreen />
      </main>
    </div>
  );
};
