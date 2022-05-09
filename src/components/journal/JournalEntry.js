export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div className="journal__entry-picture">
        <img src="https://earthsky.org/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg" alt="Entry thumbnail" />
      </div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Lorem title</p>
        <p className="journal__entry-content">Sin embargo, en algun momento muy muy lejano.</p>
      </div>
      <div className="journal__entry-date-box">
        <b>24</b>
        <span>Mon</span>
      </div>
    </div>
  )
}