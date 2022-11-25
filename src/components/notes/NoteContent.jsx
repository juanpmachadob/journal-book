import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  IoCloudUpload
} from "react-icons/io5";

import { activeNote, startUploading } from "store/actions/notes";
import { useForm } from "hooks/useForm";

export const NoteContent = ({ currentActiveNote }) => {
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(currentActiveNote);
  const { id, title, body } = formValues;
  const entryDate = moment(currentActiveNote.date);

  if (currentActiveNote.id !== id || currentActiveNote.url !== formValues.url) {
    reset(currentActiveNote);
  }

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  useEffect(() => {
    if (editing) document.getElementById("title").focus();
    reset()
  }, [editing, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <form
      className="notes__content"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <span className="notes__date">
        {entryDate.format("dddd, MMMM DD, YYYY - hh:mm a")}
      </span>
      <input
        autoComplete="off"
        className="notes__title-input"
        id="title"
        name="title"
        placeholder="Amazing title"
        type="text"
        readOnly={!editing}
        value={title}
        onChange={handleInputChange}
      />
      <textarea
        className="notes__textarea"
        id="body"
        name="body"
        placeholder="Amazing note description!"
        readOnly={!editing}
        value={body}
        onChange={handleInputChange}
      ></textarea>
      <hr />
      <div className="notes__image">
        <label htmlFor="image" className={`notes__image-label ${editing ? "editing" : ""}`}>
          <img
            src={
              currentActiveNote.url
                ? currentActiveNote.url
                : "https://via.placeholder.com/300x200?text=Thumbnail"
            }
            alt="Upload thumbnail"
          />
          {editing && <div className="notes__image-upload animate__animated animate__fadeIn animate__faster" title="Upload image"><IoCloudUpload /></div>}
        </label>
        {editing && (
          <>
            <input
              alt="Upload image"
              accept="image/*"
              className="notes__image-input"
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
    </form>
  );
};
