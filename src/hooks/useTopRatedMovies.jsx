import { OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTopRatedMovies, setTotalPages } from '../utils/moviesSlice'
import { useEffect, useState } from 'react'


const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getTopRatedMovies = async (page) => {
        setIsLoading(true);
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
                OPTIONS
            );
            const json = await data.json();

            dispatch(addTopRatedMovies(json.results));
            dispatch(setTotalPages(json.total_pages));
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTopRatedMovies(currentPage);
    }, [currentPage]); // Remove getPopularMovies from dependencies

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { currentPage, handlePageChange, isLoading };
}

export default useTopRatedMovies