import { NoteScreen } from "pages/NoteScreen";
import { JournalSidebar } from "components/journal/JournalSidebar";

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
