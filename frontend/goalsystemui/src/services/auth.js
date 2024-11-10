import Cookies from 'js-cookie';
import axios from 'axios';

async function renewToken () {
  try {
    console.log("ateinam i  renew tokennn1")
    const result = await axios.get('https://siatynaigoalsystem.azurewebsites.net/api/auth/accessToken');
    //const result = await axios.post('https://localhost:7088/api/auth/accessToken');
    const token = result.data.token;
    console.log('user token updated from', Cookies.get('jwtToken'));
    console.log('user token updated to', token);
    setCookies(token);
    return getUserInfo();
  } catch (error) {
    removeCookies();
    window.location.href = '/login';
    return null;
  }
}

function setCookies(cookie1) {
  Cookies.set('jwtToken', cookie1);
}

function removeCookies(){
  Cookies.remove('jwtToken');
}

function getUserInfo() {
  const token = Cookies.get('jwtToken');

  console.log("hello????")
  console.log("token", token)

  if (token) {
    console.log("ieinam i ifa")
    //split jwt token
    let payloadBase64 = token.split('.')[1];
    let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedJwt = JSON.parse(window.atob(base64));

    console.log("decodedjwt", decodedJwt)

    return {decodedJwt};
  }
  return null;
}

function getToken() {
  return Cookies.get('jwtToken');
}

const authService = {
  renewToken,
  setCookies,
  removeCookies,
  getUserInfo,
  getToken,
};

export default authService;