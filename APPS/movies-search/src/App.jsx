import { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const API_KEY = "7c63e6";

  async function handleSearch() {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
    );
    const data = await response.json();
    console.log(data);

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
      console.log("Error:", data.Error);
    }
  }

  function handleSearchEnter(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <h2>Movies Search</h2>
      <div className="search-bar">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onKeyDown={handleSearchEnter}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="movies-grid">
        {movies
          .filter((movie) => movie.Poster && movie.Poster !== "N/A")
          .map((movie) => (
            <MovieCard key={movie.imdbID} data={movie} />
          ))}
      </div>
    </>
  );
}

export default App;
