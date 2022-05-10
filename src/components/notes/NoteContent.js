import moment from "moment";
import { useForm } from "../../hooks/useForm";

export const NoteContent = ({ activeNote }) => {
  const [formValues, handleInputChange] = useForm(activeNote);
  const { title, body } = formValues;
  const entryDate = moment(activeNote.date);

  return (
    <form className="notes__content">
      <span className="notes__date">{entryDate.format("dddd, MMMM DD, YYYY - hh:mm a")}</span>
      <input
        autoComplete="off"
        className="notes__title-input"
        id="title"
        name="title"
        placeholder="Lorem ipsum dolor sit amet..."
        type="text"
        value={title}
        onChange={handleInputChange}
      />
      <textarea
        className="notes__textarea"
        id="content"
        name="content"
        placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore dolore iusto ipsam magni odit asperiores veritatis, voluptatem odio fugit? Architecto cumque corporis, dignissimos labore laboriosam molestiae accusantium ex praesentium.
          .
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore dolore iusto ipsam magni odit asperiores veritatis, voluptatem odio fugit?.
          .
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore dolore iusto ipsam magni odit asperiores veritatis, voluptatem odio fugit? Architecto cumque corporis, dignissimos labore laboriosam molestiae accusantium ex praesentium"
        value={body}
        onChange={handleInputChange}
      ></textarea>
      <hr />
      <div className="notes__image">
        <img
          src={activeNote.url ? activeNote.url : "https://via.placeholder.com/300x200?text=Thumbnail"}
          alt={title ? title : "Upload thumbnail"}
        />
        <input
          autoComplete="off"
          alt="Upload image"
          className="btn btn-secondary notes__image-input"
          id="image"
          name="image"
          type="image"
        />
      </div>
    </form>
  );
};
