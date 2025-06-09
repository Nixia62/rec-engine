// File: src/components/Recommendation.jsx
import React, { useState } from "react";
import recommendations from "./recommendations";
import "./Recommendation.css";

export default function Recommendation({ mood }) {
  const [randomizer, setRandomizer] = useState(0);

  const data = recommendations[mood];
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const quote = getRandomItem(data.quotes);
  const song = getRandomItem(data.songs);
  const movie = getRandomItem(data.movies);

  const shuffle = () => setRandomizer(randomizer + 1); // triggers re-render

  return (
    <div className="recommendation-container" key={randomizer}>
      <div className="section">
        <h2>✨ Quote</h2>
        <p className="quote">"{quote}"</p>
      </div>

      <div className="section">
        <h2>🎵 You should try listening to</h2>
        {song.cover && (
          <img className="cover-image" src={song.cover} alt="Song cover" />
        )}
        <a
          href={song.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="media-title"
        >
          {song.title}
        </a>
      </div>

      <div className="section">
        <h2>🎬 You should watch</h2>
        {movie.poster && (
          <img className="cover-image" src={movie.poster} alt="Movie poster" />
        )}
        <a
          href={movie.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="media-title"
        >
          {movie.title}
        </a>
        <p className="genre">{movie.genre}</p>
      </div>

      <button className="shuffle-button" onClick={shuffle}>
        🔁 Shuffle Again
      </button>
    </div>
  );
}
