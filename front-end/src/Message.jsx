import { useState, useEffect } from "react";

function Message({ lobbyId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:3000/api/messages?lobbyId=${lobbyId}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [lobbyId]);

  return (
    <>
      <h1>Chat room</h1>
      <div className="conv">
        {messages.map(message => (
          <div key={message.id} className="bubble"><p>{message.content}</p></div>
        ))}
      </div>
    </>
  );
}

export default Message
