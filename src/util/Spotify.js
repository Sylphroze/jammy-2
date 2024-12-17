// Spotify API utility module for handling authentication and requests

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Using React environment variable
const redirectUri = process.env.NODE_ENV === 'production' 
  ? 'https://spotify.com/' // Update this with your production URL
  : 'http://localhost:3000';

let accessToken;
let userId;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the parameters from the URL to avoid grabbing the token after it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  // Method to check if token exists and is valid
  hasValidToken() {
    return !!accessToken;
  },

  // Method to clear token (useful for logging out or handling errors)
  clearToken() {
    accessToken = '';
  },

  // Search tracks on Spotify
  async search(term) {
    const token = this.getAccessToken();
    
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Search request failed!');
      }

      const jsonResponse = await response.json();
      
      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  },

  // Get current user's ID
  async getCurrentUserId() {
    if (userId) {
      return userId;
    }

    const token = this.getAccessToken();
    
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get user ID');
      }

      const jsonResponse = await response.json();
      userId = jsonResponse.id;
      return userId;
    } catch (error) {
      console.error('Error getting user ID:', error);
      throw error;
    }
  },

  // Save playlist to Spotify
  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return false;
    }

    const token = this.getAccessToken();
    
    try {
      // Get the user's ID
      const userId = await this.getCurrentUserId();

      // Create a new playlist
      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            description: 'Created with Jammming',
            public: true
          })
        }
      );

      if (!createPlaylistResponse.ok) {
        throw new Error('Failed to create playlist');
      }

      const playlist = await createPlaylistResponse.json();

      // Add tracks to the playlist
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: trackUris
          })
        }
      );

      if (!addTracksResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
      }

      return true;
    } catch (error) {
      console.error('Error saving playlist:', error);
      throw error;
    }
  }
};

export default Spotify; 