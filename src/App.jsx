// File: src/App.jsx
import React, { useState } from "react";
// Fix the import paths - remove .jsx extensions and ensure correct casing
import MoodModal from "./MoodModal";
import Recommendation from "./Recommendation";
import recommendations from "./recommendations"; // Moved to src root based on your file structure
import "./App.css";

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [quote, setQuote] = useState("");
  const [song, setSong] = useState({});
  const [movie, setMovie] = useState({});

  const generateRecommendation = (mood) => {
    // Add error checking for mood existence
    if (!recommendations || !recommendations[mood]) {
      console.error(`Mood "${mood}" not found in recommendations`);
      return;
    }

    const moodData = recommendations[mood];

    // Add safety checks for empty arrays
    if (!moodData.quotes || moodData.quotes.length === 0) {
      console.error(`No quotes found for mood: ${mood}`);
      setQuote("Stay positive!");
    } else {
      const randomQuote =
        moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
      setQuote(randomQuote);
    }

    if (!moodData.songs || moodData.songs.length === 0) {
      console.error(`No songs found for mood: ${mood}`);
      setSong({ title: "No song available", cover: "", link: "" });
    } else {
      const randomSong =
        moodData.songs[Math.floor(Math.random() * moodData.songs.length)];
      setSong(randomSong);
    }

    if (!moodData.movies || moodData.movies.length === 0) {
      console.error(`No movies found for mood: ${mood}`);
      setMovie({ title: "No movie available", genre: "", link: "" });
    } else {
      const randomMovie =
        moodData.movies[Math.floor(Math.random() * moodData.movies.length)];
      setMovie(randomMovie);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    generateRecommendation(mood);
  };

  const handleShuffle = () => {
    if (selectedMood) {
      generateRecommendation(selectedMood);
    }
  };

  const handleResetMood = () => {
    setSelectedMood(null);
    setQuote("");
    setSong({});
    setMovie({});
  };

  return (
    <div className="App">
      {!selectedMood && <MoodModal onSelectMood={handleMoodSelect} />}
      {selectedMood && (
        <Recommendation
          mood={selectedMood}
          quote={quote}
          song={song}
          movie={movie}
          onShuffle={handleShuffle}
          onReset={handleResetMood}
        />
      )}
    </div>
  );
}

export default App;