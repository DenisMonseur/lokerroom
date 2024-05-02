import React, { useState, useEffect } from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import CreateLobby from "./CreateLobby";

function DisplayLobbies() {
  const [lobbies, setLobbies] = useState([]);
  const [selectedLobby, setSelectedLobby] = useState(null);

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/lobby", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLobbies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLobbies();
  }, []);

  const handleLobbyClick = (lobbyId) => {
    setSelectedLobby(lobbyId);
  };

  return (
        <div className="allChatPage">
        <div className="lobbyMenu">
          <h2>Select a Lobby</h2>
        <CreateLobby/>
        <div className="lobbyList">
          {lobbies.map((lobby) => (
            <div key={lobby.lobby_id} onClick={() => handleLobbyClick(lobby.lobby_id)} className="lobbyCard">
              <h4>{lobby.lobby_name}</h4>
            </div>
          ))}
        </div>
        </div>
      <div className="chatRoom">
        {selectedLobby && (
          <>
            <Message lobbyId={selectedLobby} />
            <NewMessage lobbyId={selectedLobby} />
          </>
        )}
      </div>
    </div>
  );
}

export default DisplayLobbies;
