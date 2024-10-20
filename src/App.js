import React from 'react';
import './css/styles.scss'
import Movie from './components/Movie';
import Header from './components/Header';
import HeroSection from './components/HeroSection';


function App() {
  return (
    <div className="App">

      <Header/>
      <HeroSection />
      <Movie />
    
      
    </div>
  )
  
}

export default App;
