import React, { useState } from "react";

function NewMessage({ lobbyId }) {
  const [message, setMessage] = useState('');
  const [resMessage, setResMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
        let user_id = localStorage.getItem('user_id');
        user_id = parseInt(user_id);
        console.log(lobbyId, message, user_id);
        const content = message;
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:3000/api/messages/new/${lobbyId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content, lobbyId, user_id
        }),
      });

      const data = await response.json();
      console.log(data);
      setResMessage(data.msg || data.err);

    } catch (error) {
      console.error(error);
    }
  };

  return (
      <form onSubmit={submit} className="newMessage">
        <input type="text" id="content" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
        <p>{resMessage}</p>
      </form>
  );
}

export default NewMessage;