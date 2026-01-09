import React from "react";

const MovieCard = ({ data }) => {
  return (
    <div className="movie-card">
      <img src={data.Poster} alt={data.Title} />
      <h3>{data.Title}</h3>
      <p></p>
      <p className="type">{`${data.Type} (${data.Year})`}</p>
    </div>
  );
};

export default MovieCard;
