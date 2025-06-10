
import React from "react";
import "./MoodModal.css";


const moods = [
  { key: "Happy", display: "Happy" },
  { key: "Good", display: "Good" },
  { key: "Sad", display: "Sad" },
  { key: "VerySad", display: "Very Sad" },
  { key: "Mad", display: "Mad" }
];

export default function MoodModal({ onSelectMood }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 id="mood-title">What is your mood today?</h2>
        <div className="mood-buttons" role="group" aria-labelledby="mood-title">
          {moods.map((mood) => (
            <button
              key={mood.key}
              className="mood-button"
              onClick={() => onSelectMood(mood.key)}
            >
              {mood.display}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}