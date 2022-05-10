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

import {
  finishEditing,
  startDeleting,
  startEditing,
  startNewNote,
  startSaveNote,
} from "../../actions/notes";

export const NoteAppBar = () => {
  const dispatch = useDispatch();
  const { active, editing } = useSelector((state) => state.notes);

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  const handleStartEditing = () => {
    dispatch(startEditing());
  };

  const handleCancelEditing = () => {
    dispatch(finishEditing());
  };

  const handleDelete = () => {
    dispatch(startDeleting(active.id));
  };

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  return (
    <header className="notes__appbar">
      <div className="notes-appbar-items">
        {editing
          ? "Editing..."
          : active && (
              <>
                <IoChevronBack className="icon" title="Next note" />
                <IoChevronForward className="icon" title="Previous note" />
              </>
            )}
      </div>
      <div className="notes-appbar-items">
        {editing ? (
          <IoBan
            className="icon"
            title="Cancel editing"
            onClick={handleCancelEditing}
          />
        ) : (
          active && (
            <>
              <IoCreateOutline
                className="icon"
                title="Edit note"
                onClick={handleStartEditing}
              />
              <IoTrashOutline
                className="icon"
                title="Delete note"
                onClick={handleDelete}
              />
            </>
          )
        )}

        <div className="notes__appbar-btn" title="Add new note">
          {editing ? (
            <IoSave className="icon" onClick={handleSave} />
          ) : (
            <IoAdd className="icon" onClick={handleAddNew} />
          )}
        </div>
      </div>
    </header>
  );
};
