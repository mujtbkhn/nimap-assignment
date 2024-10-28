import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";
import useClick from "../../hooks/useClick";
import MovieCard from "../MovieCard";
import { IMG_CDN_ORG, OPTIONS, USER_AVATAR } from "../../utils/constants";

const Header = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchText = useRef();
  const suggestionsRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useClick(suggestionsRef, () => {
    setSearchTerm("");
    setSuggestions([]);
  });

  useEffect(() => {
    const fetchSuggestions = () => {
      if (debouncedSearchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      const url = `https://api.themoviedb.org/3/search/multi?query=${debouncedSearchTerm}&include_adult=false&language=en-US&page=1`;
      fetch(url, OPTIONS)
        .then((res) => res.json())
        .then((json) => {
          setSuggestions(json.results);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchSuggestions();
  }, [debouncedSearchTerm]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-8 md:h-10"
              src="https://www.cineverse.com/images/cineverse/cineverse.svg?imwidth=256"
              alt="logo"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="items-center hidden space-x-8 md:flex">
            <Link
              to="/now-playing"
              className="text-sm font-medium text-white transition-colors hover:text-red-500"
            >
              Now Playing
            </Link>
            <Link
              to="/top-rated"
              className="text-sm font-medium text-white transition-colors hover:text-red-500"
            >
              Top Rated
            </Link>
            <Link
              to="/up-coming"
              className="text-sm font-medium text-white transition-colors hover:text-red-500"
            >
              Upcoming
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                ref={searchText}
                value={searchTerm}
                className="w-full py-2 pl-10 pr-4 text-sm text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                type="text"
                placeholder="Search movies or people..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Search Results Dropdown */}
              {searchTerm && (
                <div ref={suggestionsRef} className="absolute w-full mt-2 overflow-hidden bg-gray-900 rounded-lg shadow-xl">
                  <div className="max-h-[70vh] overflow-y-auto">
                    {suggestions?.map((result) => {
                      if (result.media_type === "movie" && result.poster_path) {
                        return (
                          <Link
                            key={result.id}
                            to={`/movieDetails/${result.id}`}
                            className="flex items-center p-3 transition-colors hover:bg-gray-800"
                          >
                            <img
                              src={`${IMG_CDN_ORG}${result.poster_path}`}
                              alt={result.title}
                              className="object-cover w-24 rounded h-30"
                            />
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-white">{result.title}</h3>
                              <p className="text-xs text-gray-400">
                                {result.release_date?.split("-")[0]}
                              </p>
                            </div>
                          </Link>
                        );
                      } else if (result.media_type === "person" && result.profile_path) {
                        return (
                          <div key={result.id} className="w-full p-4 md:w-1/3 lg:w-1/4">
                            <Link to={`/person/${result.id}`} className="block">
                              {/* <h1 className="mb-2 text-lg font-semibold truncate">{result.name}</h1> */}
                              <img
                                className="object-cover w-24 rounded h-30"
                                src={IMG_CDN_ORG + result.profile_path}
                                alt={result.name}
                              />
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-white">{result.name}</h3>
                                {/* <p className="text-xs text-gray-400">
                                {result.release_date?.split("-")[0]}
                              </p> */}
                              </div>
                            </Link>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2"
            >
              <img
                className="w-8 h-8 transition-colors border-2 border-transparent rounded-full hover:border-red-500"
                src={USER_AVATAR}
                alt="User avatar"
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-gray-900 rounded-lg shadow-xl">
                <Link
                  to="/favorite"
                  className="block px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                >
                  Favorites
                </Link>
                <Link
                  to="/watchlist"
                  className="block px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                >
                  Watchlist
                </Link>
                <Link
                  to="/exploreMovies"
                  className="block px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                >
                  Explore
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-gray-400 transition-colors rounded-lg md:hidden hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-16 6h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="py-4 md:hidden">
            <Link
              to="/now-playing"
              className="block px-4 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Now Playing
            </Link>
            <Link
              to="/top-rated"
              className="block px-4 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Top Rated
            </Link>
            <Link
              to="/up-coming"
              className="block px-4 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Upcoming
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;