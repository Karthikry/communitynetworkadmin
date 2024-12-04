import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Tune } from '@mui/icons-material';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <form
      onSubmit={onSearch}
      style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
    >
      <TextField
        placeholder="Search a FullName"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '70%' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch} color="primary">
                <SearchIcon />
              </IconButton>
              <IconButton color="primary">
                <Tune />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
