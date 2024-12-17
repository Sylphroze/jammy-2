import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Playlist from '../../components/Playlist';

describe('Playlist Component', () => {
  const mockProps = {
    playlistName: 'Test Playlist',
    playlistTracks: [],
    onNameChange: jest.fn(),
    onRemove: jest.fn(),
    onSave: jest.fn(),
    isSaving: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders playlist input and save button', () => {
    render(<Playlist {...mockProps} />);
    
    const input = screen.getByDisplayValue('Test Playlist');
    const saveButton = screen.getByText(/save to spotify/i);
    
    expect(input).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test('handles playlist name changes', () => {
    render(<Playlist {...mockProps} />);
    
    const input = screen.getByDisplayValue('Test Playlist');
    fireEvent.change(input, { target: { value: 'New Playlist Name' } });

    expect(mockProps.onNameChange).toHaveBeenCalledWith('New Playlist Name');
  });

  test('handles save button click', () => {
    render(<Playlist {...mockProps} />);
    
    const saveButton = screen.getByText(/save to spotify/i);
    fireEvent.click(saveButton);

    expect(mockProps.onSave).toHaveBeenCalled();
  });
}); 