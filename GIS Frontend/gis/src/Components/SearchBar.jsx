import React, { useState } from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import "./SearchBarStyle.css";

export const SearchBar = ({ searchText, onSearchChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="search-wrap">
            <QueryStatsIcon 
              className="search-icon" 
              fontSize="large" 
              style={{ transform: isFocused ? 'scale(1.1)' : 'scale(1)' }} 
            />
            <input
              className="search-input"
              placeholder="Търсене на локация..."
              value={searchText}
              onChange={onSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}
