export const spotifyConfig = {
  clientId: 'YOUR_CLIENT_ID', // Replace with your actual client ID
  redirectUri: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:3000'
}; 