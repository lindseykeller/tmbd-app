import React, { useState, useEffect, useRef } from "react"; // Import React and necessary hooks
import axios from "axios"; // Import axios for making HTTP requests

const ModalContent = ({ id, onClose }) => {
  const [videoId, setVideoId] = useState(""); // State for storing the YouTube video ID
  const closeButtonRef = useRef(null); // Create a ref for the close button
  const trapRef = useRef(null); // Create a ref for the focus trap container

  const fetchVideo = async () => { // Function to fetch video data from API
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}` // Construct API URL with movie ID and API key
    );
    setVideoId(data?.results[0]?.key); // Set the video ID from the API response
  };

  useEffect(() => { // Effect to fetch video when component mounts
    fetchVideo(); // Call the fetchVideo function
  }, []); // Empty dependency array means it runs once when the component mounts

  useEffect(() => {
    const focusableElements = trapRef.current.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
  
    const handleTab = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault(); // Prevent the default tab action
            lastElement.focus(); // Move focus to the last element
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault(); // Prevent the default tab action
            firstElement.focus(); // Move focus to the first element
          }
        }
      }
    };
  
    // Ensure trapRef.current is not null before adding the event listener
    if (trapRef.current) {
      trapRef.current.addEventListener('keydown', handleTab);
    }
  
    // Focus the close button when the component mounts
    closeButtonRef.current.focus();
  
    // Cleanup function to remove the event listener
    return () => {
      if (trapRef.current) {
        trapRef.current.removeEventListener('keydown', handleTab);
      }
    };
  }, []);
  
  return ( // Render the component
    <div ref={trapRef} tabIndex="-1" style={{ outline: 'none' }}>
      <iframe
        width="840" // Set iframe width
        height="390" // Set iframe height
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} // Embed YouTube video with autoplay
        title="YouTube Video" // Title for the iframe
   
        allow="autoplay; encrypted-media" // Allow autoplay and encrypted media
        allowFullScreen // Allow fullscreen mode
        tabIndex="0" // Make the iframe focusable
      ></iframe>
    
      <button ref={closeButtonRef} onClick={onClose}>Close</button> {/* Button to close the modal */}
    </div>
  );
};

export default ModalContent;

 