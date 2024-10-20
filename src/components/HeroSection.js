import React from "react";
import { useState, useEffect } from "react";
import AppModal from './AppModal';

const HeroSection = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const getUpcomingMoviestoFeature = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDk0MDk3MWZlYzJlNWZiNDlkM2QyZTQ3OTdkOWRhNSIsInN1YiI6IjY1NjU2MDE0MTU2Y2M3MDEwY2IzMTUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S8rXI1em-12sf3qRFhWknWLPRSVxOJnGnyFjK6XsdLI",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1?api_key=${process.env.REACT_APP_MOVIE_KEY}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        // console.log(response.results[0].original_title)
        setUpcomingMovies(response.results)
      )

      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUpcomingMoviestoFeature();
  }, []);

  {
    if (!upcomingMovies || !upcomingMovies.length) {
      return <p>Loading</p>;
    } else {
      return (
        <>
          <div
            className="heroSection"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/w500/${upcomingMovies[0].poster_path}" )`,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
          ></div>
          <section>
            <div className="heroInner">
              <span>

                <img
                  src={`https://image.tmdb.org/t/p/w500/${upcomingMovies[0].poster_path}`}
                />
              </span>
              <div class ="movie_info_col">
              <h2 lang={upcomingMovies[0].original_language}>{upcomingMovies[0].original_title}</h2>
              <p>{upcomingMovies[1].overview}</p>

              <p>Released on: {upcomingMovies[0].release_date}</p>
              <AppModal id = {upcomingMovies[0].id}>
                        <button class = "btn">Watch Trailer</button>
                        </AppModal>
              </div>
            </div>
          </section>
        </>
      );
    }
  }
};

export default HeroSection;
