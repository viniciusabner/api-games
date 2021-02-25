import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

const Games = () => {
  const [games, setGames] = useState();

  let url;
  let idGame;

  if (typeof window !== "undefined") {
    url = window.location?.href;
    idGame = url.split("games/")[1];
  }

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${idGame}`, {
        headers: {},
      })
      .then((preview) => {
        setGames(preview.data);
      });
  }, []);
  console.log(games, "games");
  return (
    <div>
      <div className="home-title">
        <a href="/" style={{ textDecoration: "none" }}>
          API GAMES
        </a>
      </div>
      <div className="info-game">
        {games && (
          <div className="container">
            <h2>{games.name}</h2>
            <div className="media">
              <img className="media-game" src={games.background_image} />
              <img
                className="media-game"
                src={games.background_image_additional}
              />
              {games.clip && (
                <video width="320" height="240" controls>
                  {" "}
                  <source src={games.clip.clips.full} />
                </video>
              )}
            </div>
            <div className="platforms">
              <h3>Platforms:</h3>
              {games.platforms?.map((platforms) => {
                return <span>{platforms.platform.name} </span>;
              })}
            </div>
            <div
              className="platforms"
              style={{ width: "600px", textAlign: "justify" }}
            >
              <h3>Description:</h3>
              <span>{games.description_raw}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
