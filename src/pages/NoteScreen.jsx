import { useSelector } from "react-redux";
import { EmptyNotes } from "components/notes/EmptyNotes";
import { NoteAppBar } from "components/notes/NoteAppBar";
import { NoteContent } from "components/notes/NoteContent";

export const NoteScreen = () => {
  const { active: currentActiveNote } = useSelector((state) => state.notes);
  return (
    <div className="notes__main">
      <NoteAppBar />
      {currentActiveNote ? <NoteContent currentActiveNote={currentActiveNote}/> : <EmptyNotes />}
    </div>
  );
};
