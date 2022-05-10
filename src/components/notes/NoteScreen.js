import { useSelector } from "react-redux";
import { EmptyNotes } from "./EmptyNotes";
import { NoteAppBar } from "./NoteAppBar";
import { NoteContent } from "./NoteContent";

export const NoteScreen = () => {
  const { active: activeNote } = useSelector((state) => state.notes);
  return (
    <div className="notes__main">
      <NoteAppBar />
      {activeNote ? <NoteContent activeNote={activeNote}/> : <EmptyNotes />}
    </div>
  );
};
