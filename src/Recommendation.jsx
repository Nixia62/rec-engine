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

// Main SecretModal - randomly picks one
function SecretModal({ onClose }) {
  const variant = Math.random() < 0.5 ? "runjin" : "goated";
  return variant === "runjin" ? <RunJinModal onClose={onClose} /> : <GoatedModal onClose={onClose} />;
}

// Original Run-Jin modal
function RunJinModal({ onClose }) {
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


function GoatedModal({ onClose }) {
  const [reasons, setReasons] = useState([]);

  const goatedMessages = [
  "you got crazy music taste",
  "for improving other peoples' 'marathi'",
  "for being an annoying grandma",
  "you are sweet",
  "you are crazy (would actually kill me)",
  "a pretty soul",
  "chaotic granny",
  "potato",
  "you got great humour (no)",
  "you are annoying (lovingly)",
  "your annoying ass is caring",
  "you are someone I can annoy to death",
  "emo (relatable)",
  "got great personality (acc to my 4 yrs experience)",
  "got relatable trauma",
  "you are a great person on this stupid earth",
  "for being born at the same time as me",
  "you could be sleep-deprived and still somehow comforting",
  "you radiate the same chaotic peace as a rainstorm",
  "you are loved by teddies, fictional men, and this universe",
  "you’re still here. Still trying. Still loved. That’s enough",
  "",
  "",
  "",
  "",
  "",
  "",
  "you love carrots like a bunny in therapy",
  "you’re proof that being mentally 80 is fun",
  "",
  "",
  "",
  "you live in a cave and still manage to be everyone’s comfort person",
  "",
  "you’re like if rain had a human form",
  "",
  "your hugs have healing properties (like maggi for sadness)",
  "you're proof that artistic demons are very, very real",
  "you have fictional children and you're still a better parent than most",
  "even your hatred for peanuts is weirdly cute",
  "",
  "your bond with bombil fry is spiritual",
  "you will *actually* attack if woken from sleep",
  "you're scary during Phasmophobia but soft IRL",
  "",
  "",
  "",
  "",
  "",
  "because the world feels less dumb with you in it",
  "because I said so and im right.",
];


  const generateReasons = () => {
    const shuffled = [...goatedMessages].sort(() => 0.5 - Math.random());
    setReasons(shuffled.slice(0, 50));
  };

  return (
    <div className="secret-modal">
      <div className="secret-modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>YOU FOUND THE HIDDEN BUTTON?!</h2>
        <p className="quote">You're truly something special</p>
        <button onClick={generateReasons} className="goated-btn">
          Show 50 Reasons Why You're Appreciated/Goated
        </button>

        <ul className="reasons-list">
          {reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}