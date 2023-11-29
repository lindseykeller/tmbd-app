import React, { useState, useEffect } from "react";


function Movie() {

   
    const [movieList, setMovieList] = useState([])
    const getMovie  =() => {  
         const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDk0MDk3MWZlYzJlNWZiNDlkM2QyZTQ3OTdkOWRhNSIsInN1YiI6IjY1NjU2MDE0MTU2Y2M3MDEwY2IzMTUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S8rXI1em-12sf3qRFhWknWLPRSVxOJnGnyFjK6XsdLI'
        }
      };
      //?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
      fetch('https://api.themoviedb.org/3/discover/movie', options)
        .then(response => response.json())
        .then(response => setMovieList(response.results))
        .catch(err => console.error(err))
    }
 
    
        useEffect(() => {
            getMovie();
        }, [])
    
        console.log(movieList)
        return (
            <div>
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