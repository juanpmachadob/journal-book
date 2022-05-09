export const NoteContent = () => {
  return (
    <form className="notes__content">
      <span className="notes__date">Monday, April 24, 2017</span>
      <input
        autoComplete="off"
        className="notes__title-input"
        id="title"
        name="title"
        placeholder="Lorem ipsum dolor sit amet..."
        type="text"
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
      ></textarea>
      <hr />
      <div className="notes__image">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
          alt="Upload thumbnail"
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
