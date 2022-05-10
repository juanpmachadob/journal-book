import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { activeNote, startUploading } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";

export const NoteContent = ({ currentNote }) => {
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(currentNote);
  const { id, title, body } = formValues;
  const entryDate = moment(currentNote.date);

  if (currentNote.id !== id) {
    reset(currentNote);
  }

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handlePictureUpload = () => {
    // e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <form className="notes__content">
      <span className="notes__date">
        {entryDate.format("dddd, MMMM DD, YYYY - hh:mm a")}
      </span>
      <input
        autoComplete="off"
        className="notes__title-input"
        id="title"
        name="title"
        placeholder="Lorem ipsum dolor sit amet..."
        type="text"
        readOnly={!editing}
        value={title}
        onChange={handleInputChange}
      />
      <textarea
        className="notes__textarea"
        id="body"
        name="body"
        placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore dolore iusto ipsam magni odit asperiores veritatis, voluptatem odio fugit? Architecto cumque corporis, dignissimos labore laboriosam molestiae accusantium ex praesentium.
          .
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore dolore iusto ipsam magni odit asperiores veritatis, voluptatem odio fugit?.
          .
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore dolore iusto ipsam magni odit asperiores veritatis, voluptatem odio fugit? Architecto cumque corporis, dignissimos labore laboriosam molestiae accusantium ex praesentium"
        readOnly={!editing}
        value={body}
        onChange={handleInputChange}
      ></textarea>
      <hr />
      <div className="notes__image">
        <img
          src={
            currentNote.url
              ? currentNote.url
              : "https://via.placeholder.com/300x200?text=Thumbnail"
          }
          alt="Upload thumbnail"
        />
        <input
          autoComplete="off"
          alt="Upload image"
          className="btn btn-secondary notes__image-input"
          id="image"
          name="image"
          type="file"
          onChange={handleFileChange}
          onClick={handlePictureUpload}
        />
      </div>
    </form>
  );
};
