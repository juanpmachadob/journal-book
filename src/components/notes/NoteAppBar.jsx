import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  IoChevronBack,
  IoChevronForward,
  IoCreateOutline,
  IoTrashOutline,
  IoAdd,
  IoBan,
  IoSave,
  IoMenu,
} from "react-icons/io5";

import {
  cancelEditing,
  nextNote,
  previousNote,
  startDeleting,
  startEditing,
  startNewNote,
  startSaveNote,
} from "store/actions/notes";

export const NoteAppBar = () => {
  const dispatch = useDispatch();
  const { active: currentActiveNote, editing } = useSelector(
    (state) => state.notes
  );

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  const handleStartEditing = () => {
    dispatch(startEditing());
  };

  const handleCancelEditing = () => {
    dispatch(cancelEditing(currentActiveNote.id));
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete note",
      text: "Do you want to delete the current note?",
      icon: "warning",
      confirmButtonText: "Yes, delete!",
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) dispatch(startDeleting(currentActiveNote.id));
    });
  };

  const handleSave = () => {
    dispatch(startSaveNote(currentActiveNote));
  };

  const handlePreviousNote = () => {
    dispatch(previousNote(currentActiveNote.id));
  };
  const handleNextNote = () => {
    dispatch(nextNote(currentActiveNote.id));
  };

  const handleOpenSidebar = () => {
  }


  return (
    <header className="notes__appbar">
      <div className="notes-appbar-items">
        <IoMenu
          className="icon icon--mobile"
          title="Open sidebar"
          onClick={handleOpenSidebar}
        />
        {editing
          ? "Editing..."
          : currentActiveNote && (
              <>
                <IoChevronBack
                  className="icon"
                  title="Previous note"
                  onClick={handlePreviousNote}
                />
                <IoChevronForward
                  className="icon"
                  title="Next note"
                  onClick={handleNextNote}
                />
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
          currentActiveNote && (
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

        {editing ? (
          <div
            className="notes__appbar-btn"
            title="Add new note"
            onClick={handleSave}
          >
            <IoSave className="icon" />
          </div>
        ) : (
          <div
            className="notes__appbar-btn"
            title="Add new note"
            onClick={handleAddNew}
          >
            <IoAdd className="icon" />
          </div>
        )}
      </div>
    </header>
  );
};
