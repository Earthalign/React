import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";      //importy
import "./App.css";
const API_URL = "http://www.omdbapi.com?apikey=3be177ee";       //Api
const App = () => {
    
  const [searchTerm, setSearchTerm] = useState(""); 

  const [movies, setMovies] = useState([]); //
  useEffect(() => {
    searchMovies("Spider-Man");     //Pierwsze wyszukanie
  }, []);

  const searchMovies = async (title) => {   
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  //MovieCard.jsx - Aby stworzyć komponent dla filmu, który wielokrotnie będziemy mogli powtarzać
  return (
    <div className="app">
      <h1>MovieApp</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}   //Szukanie tytułów
          placeholder="Wyszukaj tytuły"
        />
        <img
          src={SearchIcon}
          alt="search"                                      //umieszczenie ikony wyszukiwania
          onClick={() => searchMovies(searchTerm)}
        />

      </div>

      {movies?.length > 0 ? (   //jeśli lista filmów jest większa od 0 to wyświetlamy filmy
        <div className="container">
          {movies.map((movie) => (      //Mapowanie po każdym filmie 
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (     // w przeciwnym razie wyrzucamy informację, że nie znaleziono filmów
        <div className="empty">
          <h2>Nie znaleziono żadnego pasującego filmu</h2>
        </div>
      )}
                      <img src={SearchIcon} />
                      <searchMovies></searchMovies>

    </div>
  );
};

export default App;