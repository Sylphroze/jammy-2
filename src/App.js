// Main container component for the Spotify playlist creator
// Handles the overall layout and component organization

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css';

function App() {
  // Mock data for testing
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera'
    },
    {
      id: 2,
      name: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV'
    },
    {
      id: 3,
      name: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California'
    }
  ]);

  // Playlist state
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Handler for playlist name changes
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Add track to playlist
  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  // Remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <div className="app-content">
        <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack}
        />
        <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
        />
      </div>
    </div>
  );
}

export default App;