import jwt_decode from 'jwt-decode';

const jwtDecode = (token) => {
  const decoded = jwt_decode(token);
  delete decoded.exp;
  delete decoded.iat;

  return decoded;
};

export default jwtDecode;
