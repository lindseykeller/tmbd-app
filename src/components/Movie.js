import React, { useState, useEffect } from "react";


function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    //for search tbb later
   

    const getMovie = () => {  
        const API_KEY = "10940971fec2e5fb49d3d2e4797d9da5";
        const discoverEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
        const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
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
        .then(response => setMovieList(response.results))
        .catch(err => console.error(err))
     
    }

        useEffect(() => {
           getMovie();
       }, [searchQuery])
   
       console.log(movieList);
        return (
            <div>
                 <div className="searchBar">
                  <input type="text" value={searchQuery}
                   onChange = {(e) => {
                    setSearchQuery(e.target.value)
                    console.log(e.target.value)
                   }}
                  />
                  <button>Show All</button>
                </div>
                {
                    movieList.map((movie) => (
                        <>
                        <img src = {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                        <p>{movie.original_title}</p>
                        <p>{movie.overview}</p>
                        <p>{movie.release_date}</p>
                        </>
                    ))
                }
            </div>
        )
    

}

export default Movie