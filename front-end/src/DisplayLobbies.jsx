import { useState, useEffect } from "react";

function DisplayLobbies() {
  const [lobbies, setLobbies] = useState([]);
  
  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/lobby", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
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

  return (
    <div className="allLobbies">
      {lobbies.map((lobby) => (
        <div key={lobby.id} className="lobby">
          <button>
            {lobby.lobby_name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayLobbies;