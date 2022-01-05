import { useState } from "react";

const NewCardForm = (props) => {
  const [message, setMessage] = useState("");
  const handleMessageChange = (changeEvent) => {
    setMessage(changeEvent.target.value);
  };

  const submitNewCard = (changeEvent) => {
    changeEvent.preventDefault();
    props.createNewCard({ message: message });
    setMessage("");
  };

  return (
    <form onSubmit={submitNewCard} className="new-card-form__form">
      <label>Message</label>
      <input type="text" onChange={handleMessageChange} value={message}></input>
      <p>Preview: {message}</p>
      <input type="Submit"></input>
    </form>
  );
};

export default NewCardForm;
