// Main container component for the Spotify playlist creator
// Handles the overall layout and component organization

import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './util/Spotify';
import './App.css';

function App() {
  // Mock data for testing - now including Spotify URIs
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'
    },
    {
      id: 2,
      name: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      uri: 'spotify:track:5CQ30WqJwcep0pYcV4AMNc'
    },
    {
      id: 3,
      name: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      uri: 'spotify:track:40riOy7x9W7GXjyGp4pjAv'
    }
  ]);

  // Playlist state
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Check for token on component mount
  useEffect(() => {
    const token = Spotify.getAccessToken();
    if (token) {
      console.log('Successfully authenticated with Spotify');
    }
  }, []);

  // Handler for search
  const search = async (searchTerm) => {
    if (!searchTerm.trim()) {
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await Spotify.search(searchTerm);
      setSearchResults(results);
    } catch (error) {
      setSearchError('Failed to search tracks. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

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

  // Save playlist to Spotify
  const savePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    
    if (!trackUris.length) {
      alert('Please add some tracks to your playlist first!');
      return;
    }

    try {
      const success = await Spotify.savePlaylist(playlistName, trackUris);
      
      if (success) {
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
        alert('Playlist saved successfully!');
      }
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar 
        onSearch={search} 
        isSearching={isSearching}
      />
      {searchError && (
        <div className="error-message">{searchError}</div>
      )}
      <div className="app-content">
        <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack}
          isSearching={isSearching}
        />
        <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;