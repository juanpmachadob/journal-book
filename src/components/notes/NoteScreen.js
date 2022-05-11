import { useSelector } from "react-redux";
import { EmptyNotes } from "./EmptyNotes";
import { NoteAppBar } from "./NoteAppBar";
import { NoteContent } from "./NoteContent";

export const NoteScreen = () => {
  const { active: currentActiveNote } = useSelector((state) => state.notes);
  return (
    <div className="notes__main">
      <NoteAppBar />
      {currentActiveNote ? <NoteContent currentActiveNote={currentActiveNote}/> : <EmptyNotes />}
    </div>
  );
};
