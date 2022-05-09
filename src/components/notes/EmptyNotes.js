import { IoDocumentText } from "react-icons/io5";

export const EmptyNotes = () => {
  return (
    <div className="notes__empty">
      <IoDocumentText />
      <span>No entries created</span>
      <p>Click the <b>+</b> button above to create a new entry.</p>
    </div>
  );
};
