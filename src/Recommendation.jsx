import React, { useState } from "react";
import recommendations from "./recommendations";
import "./Recommendation.css";

export default function Recommendation({ mood }) {
  const [randomizer, setRandomizer] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);


  const [buttonCorner] = useState(() => {
    const corners = [
      { top: "10px", left: "10px" },   
      { top: "10px", right: "10px" },      
      { bottom: "10px", left: "10px" },   
      { bottom: "10px", right: "10px" }, 
    ];
    return corners[Math.floor(Math.random() * corners.length)];
  });

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const data = recommendations[mood];

  if (!data && !showSecretModal) {
    return (
      <>
        <p className="error">No recommendations found for "{mood}".</p>
        <button
          className="invisible-trigger"
          onClick={() => setShowSecretModal(true)}
          aria-label="Secret Button"
          style={{
            position: "fixed",
            width: "30px",
            height: "30px",
            opacity: 0,
            zIndex: 9999,
            cursor: "pointer",
            ...buttonCorner,
          }}
        />
        {showSecretModal && <SecretModal onClose={() => setShowSecretModal(false)} />}
      </>
    );
  }

  const quote = data && getRandomItem(data.quotes);
  const song = data && getRandomItem(data.songs);
  const movie = data && getRandomItem(data.movies);

  const shuffle = () => setRandomizer(randomizer + 1);

  return (
    <>
      {!showSecretModal && (
        <>
          <div className="recommendation-container" key={randomizer}>
            <div className="section">
              <p className="quote">"{quote}"</p>
            </div>

            <div className="section">
              <h2>You should try listening to :</h2>
              {song?.cover && (
                <img className="cover-image" src={song.cover} alt="Song cover" />
              )}
              <a
                href={song?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="media-title"
              >
                {song?.title}
              </a>
            </div>

            <div className="section">
              <h2>You should watch:</h2>
              {movie?.poster && (
                <img className="cover-image" src={movie.poster} alt="Movie poster" />
              )}
              <a
                href={movie?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="media-title"
              >
                {movie?.title}
              </a>
              <p className="genre">{movie?.genre}</p>
            </div>
          </div>

          <div className="shuffle-section">
            <h3>Didn't like the recs?</h3>
            <button className="shuffle-button" onClick={shuffle}>
              Change it!
            </button>
          </div>
        </>
      )}


      <button
        className="invisible-trigger"
        onClick={() => setShowSecretModal(true)}
        aria-label="Secret Button"
        style={{
          position: "fixed",
          width: "100px",
          height: "80px",
          opacity: 0,
          zIndex: 9999,
          cursor: "pointer",
          ...buttonCorner,
        }}
      />


      {showSecretModal && <SecretModal onClose={() => setShowSecretModal(false)} />}
    </>
  );
}

function SecretModal({ onClose }) {
  const data = recommendations["really sad"];
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const quote = getRandomItem(data.quotes);
  const movie = getRandomItem(data.movies);

  return (
    <div className="secret-modal">
      <div className="secret-modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>OH YOU FOUND IT!!!</h2>
        <p className="quote">"{quote}"</p>
        <h3>Here's the reward for ur search:</h3>
        <a
          href={movie?.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="media-title"
        >
          {movie?.title}
        </a>
      </div>
    </div>
  );
}


