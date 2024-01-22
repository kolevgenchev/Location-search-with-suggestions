import React, { useState, useEffect } from 'react';
import './App.css';
import { SearchBar } from './Components/SearchBar';
import SearchSuggestions from './Components/SearchSuggestions';
import SearchResults from './Components/SearchResults';
import { useDebounce } from 'use-debounce';

function App() {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  useEffect(() => {
    if (debouncedSearchText) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&text=${encodeURIComponent(debouncedSearchText)}`);
          const data = await response.json();
          setSuggestions(data.suggestions || []);
        } catch (error) {
          console.error('There was an error fetching the suggestions:', error);
        }
      };
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSuggestionSelect = async (suggestion) => {
    try {
      // Here i'm Fetching more detailed information using the magicKey
      const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${suggestion.magicKey}&f=json`);
      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        // I'm storing the full candidate object in the selected suggestions state
        setSelectedSuggestions(prevSelected => [...prevSelected, ...data.candidates]);
      }
    } catch (error) {
      console.error('Error fetching detailed address information:', error);
    }
    setSearchText(''); // Clearing the search text
    setSuggestions([]); // Clearing the suggestions
  };

  return (
    <div className="App">
      <div className="Search">
        <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
        {searchText && <SearchSuggestions suggestions={suggestions} onSuggestionSelect={handleSuggestionSelect} />}
      </div>

      <SearchResults selectedSuggestions={selectedSuggestions} />
    </div>
  );
}

export default App;
