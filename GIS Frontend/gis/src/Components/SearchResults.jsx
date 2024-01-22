import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const SearchResults = ({ selectedSuggestions }) => {
  if (selectedSuggestions.length === 0) {
    return null;
  }

  const bigBoldStyle = {
    fontSize: '1.1em', 
    color:'black'
  };

  const primaryStyle = {
    fontSize: '1.4em',
    fontWeight:'bold' 
  };

  return (
    <Box sx={{ mt: 7, overflow: 'hidden', px: { xs: 2, sm: 0 } }}> 
      <Paper elevation={3} sx={{
        maxWidth: 600,
        mx: 'auto',
        borderRadius: '16px',
        overflow: 'auto',
        maxHeight: '50vh',
        backgroundColor: 'rgba(255,255,255,0.7)', 
        backdropFilter: 'blur(10px)', 
        '&:not(:last-child)': {
          mb: 2, 
        }
      }}>
        <List aria-label="selected search results" sx={{ padding: 0 }}>
        {selectedSuggestions.map((suggestion, index) => (
  <ListItem key={`${suggestion.location.x}-${suggestion.location.y}-${index}`} sx={{ borderBottom: '1px solid #eee' }}>
    <ListItemAvatar>
      <Avatar>
        <LocationOnIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText 
      primary={suggestion.address} 
      secondary={`Координати: ${suggestion.location.y}, ${suggestion.location.x}`}
      primaryTypographyProps={{ style: primaryStyle }}
      secondaryTypographyProps={{ style: bigBoldStyle }}
    />
  </ListItem>
))}

        </List>
      </Paper>
    </Box>
  );
};

export default SearchResults;
