import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const clientId = process.env.EXPO_CALENDLY_CLIENT_ID;
const redirectUri = process.env.EXPO_REDIRECT_URI;

const api = axios.create({
  baseURL: apiUrl,
});

export const getUserData = async (accessToken) => {
  try {
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getAccessToken = async (code) => {
  try {
    const response = await axios.post('https://auth.calendly.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};