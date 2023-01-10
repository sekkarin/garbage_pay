import {StyleSheet, View, Image, TextInput, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import Colors from '../../constants/Colors';
import PrimaryButton from '../../components/ui/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {AuthContext} from '../../store/auth-context';

const LoginScreen = () => {
  const navigator = useNavigation();
  const [isFetch, setIsFecth] = useState(false);
  const [emailLogin, setEmail] = useState('');
  const [passwrdLogin, setPassword] = useState('');
  const authCtx = useContext(AuthContext);
  const loginHander = async () => {
    // navigator.navigate('WelcomeScreen');
    try {
      setIsFecth(true);

      const respones = await fetch('http://10.0.2.2:8080/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailLogin,
          password: passwrdLogin,
        }),
      });

      if (respones.status !== 401) {
        const res = await respones.json();
        authCtx.authenticate(res.token);
        // authCtx.authenticateDate(res.token);
        navigator.goBack();
      } else {
        console.log('ข้อมูลไม่ถูกต้อง');
        Alert.alert('ไม่สามารถเข้าสู่ระบบได้');
      }
      setIsFecth(false);
    } catch (err) {
      Alert.alert('ไม่สามารถเข้าสู่ระบบได้');
      // navigator.goBack()
      setIsFecth(false);
    }
  };
  if (isFetch) {
    return <LoadingOverlay message="กำลังเข้าสู่ระบบ" />;
  }
  // console.log(emailLogin, passwrdLogin);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/car_garbage.png')}
        />
        <TextInput
          placeholder="อีเมล์"
          keyboardType="default"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="รหัสผ่าน"
          keyboardType="visible-password"
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyButton}>
          <PrimaryButton
            bgcolor={Colors.primary}
            fontcolor={'#424242'}
            title={'เข้าสู่ระบบ'}
            onPress={loginHander}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 308,
    height: 176,
  },
  bodyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  bodyButton: {
    marginVertical: 5,
  },
  imageContainer: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
});
