import { useDispatch, useSelector } from "react-redux";
import {
  IoChevronBack,
  IoChevronForward,
  IoCreateOutline,
  IoTrashOutline,
  IoAdd,
  IoBan,
  IoSave,
} from "react-icons/io5";

import { startNewNote } from "../../actions/notes";

export const NoteAppBar = () => {
  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

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
          <IoAdd className="icon" onClick={handleAddNew}/>
          {/* <IoSave className="icon"/> */}
        </div>
      </div>
    </header>
  );
};
