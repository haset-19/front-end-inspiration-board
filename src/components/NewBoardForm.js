import { useState } from "react";

const NewBoardForm = (props) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  const handleTitleChange = (changeEvent) => {
    setTitle(changeEvent.target.value);
  };
  const handleOwnerChange = (changeEvent) => {
    setOwner(changeEvent.target.value);
  };

  const submitNewBoard = (changeEvent) => {
    changeEvent.preventDefault();
    props.createNewBoard({ title, owner });
    setTitle("");
    setOwner("");
  };

  return (
    <form onSubmit={submitNewBoard}>
      <label>Title</label>
      <input type="text" value={title} onChange={handleTitleChange}></input>
      <label>Owner's Name</label>
      <input type="text" value={owner} onChange={handleOwnerChange}></input>
      <p>
        Preview: {title} - {owner}
      </p>
      <input type="Submit"></input>
    </form>
  );
};

export default NewBoardForm;
