import {
  IoChevronBack,
  IoChevronForward,
  IoCreateOutline,
  IoTrashOutline,
  IoAdd,
  IoBan,
  IoSave,
} from "react-icons/io5";

export const NoteAppBar = () => {
  return (
    <header className="notes__appbar">
      <div className="notes-appbar-items">
        <IoChevronBack className="icon" title="Next note" />
        <IoChevronForward className="icon" title="Previous note" />
        {/* Editting... */}
      </div>
      <div className="notes-appbar-items">
        <IoCreateOutline className="icon" title="Edit note" />
        <IoTrashOutline className="icon" title="Delete note" />
        {/* <IoBan className="icon" title="Cancel editing" /> */}
        <div className="notes__appbar-btn" title="Add new note" >
          <IoAdd className="icon"/>
          {/* <IoSave className="icon"/> */}
        </div>
      </div>
    </header>
  );
};
