import React from "react";
import Header from "./MainContainer/Header";
import useNowPlayingMovies from "../hooks/useNowPlaying";
import MainContainer from "./MainContainer/MainContainer";
import { useSelector } from "react-redux";
import MovieList from "./MainContainer/MovieList";

const NowPlaying = () => {
  const { currentPage, handlePageChange, isLoading } = useNowPlayingMovies();
  const { nowPlayingMovies, totalPages } = useSelector((store) => store.movies);

  return (
    <div className="overflow-y-scroll scrollbar-hide">
      <Header />
      <MainContainer />
      <div className="bg-[#04152D] scrollbar-hide">
        <div className="relative z-20 pb-4 -mt-20 scrollbar-hide">
          <MovieList
            title="Now Playing"
            movies={nowPlayingMovies || []}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
