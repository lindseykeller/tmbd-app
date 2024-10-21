import React, { useState, useEffect } from "react";
import Genres from './Genres';
import AppModal from './AppModal';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';
import genresIDs from ".//../utils/genresIDs";

function Movie() {
    
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setIsErr] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const getMovie = () => {  
        const discoverEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&page=${currentPage}&with_genres=${ids}`;
        const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${searchQuery}`;
        const genreEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_KEY}`;
        const endpoints = searchQuery ? searchEndpoint : discoverEndpoint;
        const options = {
       method: 'GET',
       headers: {
         accept: 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDk0MDk3MWZlYzJlNWZiNDlkM2QyZTQ3OTdkOWRhNSIsInN1YiI6IjY1NjU2MDE0MTU2Y2M3MDEwY2IzMTUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S8rXI1em-12sf3qRFhWknWLPRSVxOJnGnyFjK6XsdLI'
       }
     };
     //?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

         fetch(endpoints, options)
        .then(response => response.json())
        .then(
            response => 
            setMovieList(response.results.slice(0, 60)), setLoading(false)
          
        )
       
        .catch(err => setIsErr(true))
        // .catch(err => setIsErr(true))
     
    }

        useEffect(() => {
           getMovie();
       }, [searchQuery, currentPage, totalPages, selectedGenres])
   
       console.log(genres);
      const ids = genresIDs(selectedGenres);
   
       const showAll = () => {
        getMovie();
       }
       const prevPage = () => {
        if(currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
       }
       const nextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage((next) => next + 1)
        }
       }
       
        return (
            <>
            {loading ? (
                <LoadingComponent />
                ) :
                 err ? (<ErrorComponent/>)
                 
                 : (
            
              <>
                <div className="filtersContainer">
                 <div className="searchBar">
                    <label for ="search">Search by movie title</label>
                  <input type="text" id ="search" placeholder="Search" value={searchQuery}
                   onChange = {(e) => {
                    setSearchQuery(e.target.value)
                    console.log(e.target.value)
                   }}
                  />
                 <button onCLick={showAll} hidden>Show All</button>
                </div>
                <div className ="genre_col">
                <h2>Filter by genre</h2>
                <Genres genres = {genres} setGenres = {setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
                </div>
              </div>
              <div className="movieContainer">
                {
                    movieList.map((movie) => {
                        const movieID = movie.id;
                    return  (     
                        <div key={movieID} className="movieCard"> 
                        <img src = {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                        <p>{movie.original_title}</p>
                        <p>{movie.overview}</p>
                        <p>{movie.release_date}</p>
                        <AppModal id = {movieID}>
                        <button>Watch Trailer</button>
                        </AppModal>
                        
                        </div>)  
                      
})
               
                }
           </div>
                    {currentPage > 1 && (
                        <button  onClick = {prevPage} > Back </button>
                    )}
              
                <p>Page {currentPage}</p>
                {currentPage < totalPages && (
                      <button onClick = {
                        nextPage
                    } > Next </button>
                    
                )}
          </>
            
            )}
           
               </>
        )
    
    

}

export default Movie