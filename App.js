import * as React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import Navigation from './navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/ui/LoadingOverlay';
import jwt_decode from 'jwt-decode';
import { StripeProvider } from '@stripe/stripe-react-native';
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
      <StripeProvider
        publishableKey="pk_test_51MRWDYL9mFxnSBD4okDalpRO8YO9BQovF44Jdm2qYrdh30nwKXo9A8oX1zFh7O3075cCZdih0bOo0fy5HNkIvdUp00VZ18p3ku"
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        // merchantIdentifier="merchant.com.garbage_pay" // required for Apple Pay
      >
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </StripeProvider>
    </>
  );
}
