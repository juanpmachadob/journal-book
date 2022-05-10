import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { activeNote } from "../../actions/notes";
import { useState } from "react";

export const JournalEntry = ({ id, date, title, body, url }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const entryDate = moment(date);
  const entryTitle = `${title.substr(0, 18)}`;
  const entryContent = `${body.substr(0, 50)}...`;

  const handleEntryClick = () => {
    dispatch(
      activeNote(id, {
        date,
        title,
        body,
        url,
      })
    );
  };

  return (
    <div
      className={`journal__entry ${active?.id === id ? "active" : ""}`}
      onClick={handleEntryClick}
    >
      <div className="journal__entry-picture">
        <img
          src={url ? url : "https://via.placeholder.com/300x200?text=Thumbnail"}
          alt={title ? title : "Entry thumbnail"}
        />
      </div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">{entryTitle}</p>
        <p className="journal__entry-content">{entryContent}</p>
      </div>
      <div className="journal__entry-date-box">
        <b>{entryDate.format("DD")}</b>
        <span>{entryDate.format("ddd")}</span>
      </div>
    </div>
  );
};
