import * as React from 'react';
import {Alert, SafeAreaView} from 'react-native';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import Navigation from './navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/ui/LoadingOverlay';
import jwt_decode from 'jwt-decode';
// ทำการโหลด ข้อมูลเข้าสู่ระบบ และ แสดงหน้าโหลด
function Root() {
  const [isFetch, setIsFecth] = React.useState(false);
  const authCtx = React.useContext(AuthContext);
  React.useEffect(() => {
    async function fetchToken() {
      try {
        setIsFecth(true);
        await AsyncStorage.getItem('token')
          .then(result => {
            // console.log(result);
            authCtx.authenticate(result == null ? '' : result);
            if (result) {
              const decoded = jwt_decode(result);
              if (decoded.exp * 1000 <= Date.now()) {
                // console.log('หมดอายุ');
                authCtx.logout();
                Alert.alert('หมดอายุการใช้งาน');
                setIsFecth(false);
                return;
              }
            }
          })
          .catch(err => {
            const errormsg = 'เกิดข้อผิดพลาด...';
            // console.log('เพิ่ม TOKEN ไม่ได้', err);
            Alert.alert(errormsg);
          });
        setIsFecth(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isFetch) {
    return <LoadingOverlay message="กำลังเปิดใช้งาน..." />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <SafeAreaView />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
