import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

const Home = () => {
  const [games, setGames] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.rawg.io/api/games?key=a8a63022cfed4affb654db319893074e&dates=2020-11-01,2021-02-24&platforms=18,1,7",
        {
          headers: {},
        }
      )
      .then((preview) => {
        setGames(preview.data.results);
      });
  }, []);

  console.log(games, "games");
  return (
    <>
      <div className="home-title">
        <a href="/" style={{ textDecoration: "none" }}>
          API GAMES
        </a>
      </div>
      <div className="cards-games">
        {games?.map((infos) => {
          return (
            <a href={`/games/${infos.id}`}>
              <div className="cards">
                <img className="thumbnail-game" src={infos.background_image} />
                <div className="info-cards">
                  <h3>{infos.name}</h3>
                  <div className="platforms">
                    {infos.platforms?.map((platforms) => {
                      console.log(infos, "gamegamess");
                      return <span> - {platforms.platform.name} </span>;
                    })}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Home;
