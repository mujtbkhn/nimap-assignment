import React from "react";
import Header from "./MainContainer/Header";
import MainContainer from "./MainContainer/MainContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import { useSelector } from "react-redux";
import MovieList from "./MainContainer/MovieList";

const TopRated = () => {
    const { currentPage, handlePageChange, isLoading } = useTopRatedMovies();
    const { topRatedMovies, totalPages } = useSelector((store) => store.movies);

    return (
        <div className="overflow-y-scroll scrollbar-hide">
            <Header />
            <MainContainer />
            <div className="bg-[#04152D] scrollbar-hide">
                <div className="relative z-20 pb-4 -mt-20 scrollbar-hide">
                    <MovieList
                        title="Top Rated"
                        movies={topRatedMovies || []}
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

export default TopRated;