import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Spotify from '../../util/Spotify';

// Mock Spotify module
jest.mock('../../util/Spotify', () => ({
  getAccessToken: jest.fn(),
  search: jest.fn(),
  hasValidToken: jest.fn(() => true),
  savePlaylist: jest.fn()
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Setup default mock implementations
    Spotify.getAccessToken.mockReturnValue('mock-token');
  });

  test('renders main app components', () => {
    render(<App />);
    
    expect(screen.getByText(/jammming/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for a song/i)).toBeInTheDocument();
  });

  test('handles search functionality', async () => {
    const mockSearchResults = [
      {
        id: 1,
        name: 'Test Song',
        artist: 'Test Artist',
        album: 'Test Album',
        uri: 'spotify:track:test'
      }
    ];

    Spotify.search.mockResolvedValueOnce(mockSearchResults);

    render(<App />);
    
    const searchInput = screen.getByPlaceholderText(/search for a song/i);
    const searchButton = screen.getByText(/search/i);

    await userEvent.type(searchInput, 'test song');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(Spotify.search).toHaveBeenCalledWith('test song');
    });
  });

  test('handles adding and removing tracks from playlist', () => {
    render(<App />);
    
    // Get the first track from mock data
    const addButton = screen.getAllByText('+')[0];
    fireEvent.click(addButton);

    // Track should now be in playlist
    expect(screen.getAllByText('Bohemian Rhapsody')).toHaveLength(2); // One in results, one in playlist

    // Find remove button in playlist
    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    // Should only be one instance of the track name now (in results)
    expect(screen.getAllByText('Bohemian Rhapsody')).toHaveLength(1);
  });
}); 