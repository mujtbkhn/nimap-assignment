import React from "react";
import MovieCard from "../MovieCard";
import Pagination from "../../utils/Pagination";

const MovieList = ({ title, movies, currentPage, totalPages, onPageChange, isLoading }) => {
  return (
    <div className="mx-10 md:mx-20 sm:mx-16">
      <h1 className="flex justify-center py-8 text-4xl mt-20 font-bold text-gray-400 sm:text-6xl md:text-8xl lg:text-9xl xl:text-[160px] md:mt-10 font-roboto">
        {title}
      </h1>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-10">
              {movies?.map((movie) => (
                <div key={movie.id} className="flex text-white">
                  <MovieCard
                    posterPath={movie.poster_path}
                    id={movie.id}
                    rating={movie.vote_average.toFixed(1)}
                    trimmedTitle={
                      window.innerWidth < 768
                        ? movie.title.length > 5
                          ? movie.title.slice(0, 6) + "..."
                          : movie.title
                        : movie.title.length > 10
                          ? movie.title.slice(0, 15) + "..."
                          : movie.title
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {!isLoading && movies?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;