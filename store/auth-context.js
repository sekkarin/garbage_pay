import {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({
  token: '',
  authenticateDate: () => {},
  data: {},
  isAuthenticate: false,
  authenticate: () => {},
  logout: () => {},
});
function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState('');
  const [autheEmail, setAuthEmail] = useState('');
  const [authuSerId, setAuthUserId] = useState('');
  const [authExp, setAuthExp] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [isExp, setIsExp] = useState(false);

  async function authenticate(token) {
    if (token) {
      setAuthToken(token);
      AsyncStorage.setItem('token', token);
      const decoded = await jwt_decode(token);
      setAuthEmail(decoded.email);
      setAuthExp(decoded.exp);
      setAuthUserId(decoded.userId);
      setAuthStatus(decoded.status);
      setIsExp(true);
    }
  }

  function logout() {
    setAuthToken(null);
    setAuthEmail('');
    setAuthExp('');
    setAuthUserId('');
    setAuthUserId('');
    setIsExp(false);
    AsyncStorage.setItem('token', '');
  }

  const value = {
    token: authToken,
    isAuthenticate: !!authToken && isExp ? true : false, //เช็ค มีโทเค็น และ หมดอายุ หรือ ไหม
    authenticate: authenticate,
    logout: logout,
    data: {
      email: autheEmail,
      userId: authuSerId,
      exp: authExp,
      status: authStatus,
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
