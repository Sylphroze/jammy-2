import Spotify from '../../util/Spotify';

describe('Spotify Utility', () => {
  beforeEach(() => {
    // Reset mocks and global objects
    jest.clearAllMocks();
    global.fetch = jest.fn();
    
    // Mock window.location
    delete window.location;
    window.location = {
      href: 'http://localhost:3000',
      assign: jest.fn()
    };
  });

  describe('getAccessToken', () => {
    test('returns existing token if available', () => {
      const token = 'test-token';
      window.location.href = `http://localhost:3000#access_token=${token}&expires_in=3600`;
      
      const result = Spotify.getAccessToken();
      expect(result).toBe(token);
    });

    test('redirects to Spotify login if no token', () => {
      Spotify.getAccessToken();
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining('accounts.spotify.com/authorize')
      );
    });
  });

  describe('search', () => {
    test('searches tracks successfully', async () => {
      const mockResponse = {
        tracks: {
          items: [{
            id: '1',
            name: 'Test Track',
            artists: [{ name: 'Test Artist' }],
            album: { name: 'Test Album' },
            uri: 'spotify:track:test'
          }]
        }
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const results = await Spotify.search('test');
      
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Test Track');
    });
  });
}); 