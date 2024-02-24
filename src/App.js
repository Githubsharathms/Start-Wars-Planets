// App.js
import React, { useState } from 'react';
import PlanetsList from './Components/PlanetsList';
import DarkModeToggle from './Components/DarkModeToggle';
import Pagination from './Components/Pagination';
import '../src/App.css';
import { useContext } from 'react';
import { themeContext } from './Context';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const appStyles = {
    backgroundColor: darkMode ? 'black' : 'white',
    color: darkMode ? 'white' : 'black',
  };

  return (
    <div className="App" style={appStyles}>
      <DarkModeToggle />
      <h1>Star Wars Planets</h1>
     
      <PlanetsList searchTerm={searchTerm} />
      {/* <Pagination />  */}
    </div>
  );
}

export default App;
