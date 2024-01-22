import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 

const SearchSuggestions = ({ suggestions, onSuggestionSelect }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => (prevIndex + 1) % suggestions.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
      } else if (event.key === 'Enter' && highlightedIndex >= 0) {
        onSuggestionSelect(suggestions[highlightedIndex]);
      }
    };

    // Here im ddding event listener for key presses
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [suggestions, highlightedIndex, onSuggestionSelect]);

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
      document.getElementById(`suggestion-item-${highlightedIndex}`)?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex, suggestions.length]);

  return (
    <div className='SearchResContainer'>
      <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 'modal', width: '100%', mt: 1 }}>
        <Paper elevation={3} sx={{ width: 'inherit', maxHeight: 300, overflow: 'auto', borderRadius: '16px', mt: 1 }}>
          <List component="nav" aria-label="search results" sx={{ padding: 0 }}>
            {suggestions.map((suggestion, index) => (
              <React.Fragment key={suggestion.magicKey || index}>
                <ListItem
                  button
                  id={`suggestion-item-${index}`}
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                    bgcolor: highlightedIndex === index ? 'action.selected' : 'background.paper'
                  }}
                  onClick={() => onSuggestionSelect(suggestion)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOnIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={suggestion.text} />
                </ListItem>
                {index < suggestions.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
};

export default SearchSuggestions;
