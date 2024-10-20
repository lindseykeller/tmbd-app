import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MuiChipCustom from "./componentStyling/MuiChipCustom";

const Genres = ({genres, setGenres, selectedGenres, setSelectedGenres}) => {
    const fetchGenres = async () => {
     const {data} =   await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_KEY}`
        );
        setGenres(data?.genres);
    };
    useEffect(() =>{
        fetchGenres();
    }, []);
    //handle add
    const handleAddGenres = genre => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres?.filter( g => g?.id !== genre?.id))
    }
 // Handle remove
 const handleRemoveGenres = (genre) => {
    setSelectedGenres(
      selectedGenres?.filter((selected) => selected?.id !== genre?.id)
    );
    setGenres([...genres, genre]);
  };

  // Handle key press for closing the chip
  const handleKeyDown = (event, genre) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent default behavior for space
      handleRemoveGenres(genre); // Call the remove handler
    }
  };
    return (
        <div className ="genreContainer">
        {selectedGenres?.map(genre => (
        <MuiChipCustom
        key={genre.id}
     
        clickable 
        label={genre.name}
        onDelete={() => handleRemoveGenres(genre)}
        onKeyDown={(event) => handleKeyDown(event, genre)} // Handle keyboard events
        tabIndex={0} // Make it focusable
       id = "genreChip"
       aria-label={`Remove ${genre.name}`} 

        />
        ))}
          {genres.map(genre=>( 
          <MuiChipCustom 
          key={genre.id}
          label = {genre?.name}
          onClick ={() => handleAddGenres(genre)}
          clickable
          
          id = "genreChip"
          aria-label={`Filter by ${genre.name}`} 
          />)
             
          )}
        </div>
    )
};


export default Genres;