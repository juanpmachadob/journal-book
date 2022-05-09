import { EmptyNotes } from "./EmptyNotes";
import { NoteAppBar } from "./NoteAppBar";
import { NoteContent } from "./NoteContent";

export const NoteScreen = () => {
  return (
    <div className="notes__main">
      <NoteAppBar />
      {/* <NoteContent /> */}
      <EmptyNotes />
    </div>
  );
};
