import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = forwardRef(function MovieCard(
  { title, posterPath, genreIds, movieId },
  ref
) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/movies/${movieId}`);
  }

  const genreArr = useSelector((state) => state.genre.genres);
  let movieGenres = [];

  genreIds.forEach((genreId) => {
    let genre = genreArr.find((genre) => genre.id == genreId);
    if (movieGenres.length < 2) {
      let name = genre.name;
      if (name === "Science Fiction") {
        name = "Sci-Fi";
      }
      movieGenres.push(name);
    }
  });

  return (
    <div className="flex">
      <div className="card sm:max-w-[180px] p-1">
        <div
          className="relative sm:max-w-[180px] sm:max-h-[260px] overflow-hidden shadow-lg group cursor-pointer"
          onClick={handleNavigate}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            className="transition-transform group-hover:scale-110 duration-200"
          />
          <div className="absolute inset-0 flex items-end text-xs gap-2 bg-gradient-to-t pb-2 pl-2 from-black/60 to-transparent">
            {movieGenres.map((genre) => (
              <div
                key={genre}
                className="py-1/2 px-2 rounded-lg text-white text-[10px] bg-[#ff5100]"
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <h2 className="text-white whitespace-nowrap text-ellipse overflow-hidden">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
