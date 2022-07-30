const REST_API_KEY = '92b188823eea03220976d3e695f0f57c';
const REDIRECT_URI = 'http://localhost:3000/home';

export const AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
