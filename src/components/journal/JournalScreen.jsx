import { NoteScreen } from "../notes/NoteScreen";
import { JournalSidebar } from "./JournalSidebar";

export const JournalScreen = () => {
  return (
    <div className="journal__main animate__animated animate__fadeIn animate__faster">
      <JournalSidebar />
      <main className="journal__content">
        <NoteScreen />
      </main>
    </div>
  );
};
