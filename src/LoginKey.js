const currentLocation = window.location;
const baseUrl = currentLocation.protocol + "//" + currentLocation.host;
export const AUTH_URL = `https://api.missulgan.art/oauth2/authorization/kakao?redirect_uri=${baseUrl}/login/oauth2`;