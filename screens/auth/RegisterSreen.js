/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Colors from '../../constants/Colors';
import CancelButton from '../../components/ui/CancelButton';
import Textstyles from '../../constants/Textstyles';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const RegisterSreen = () => {
  const [isFetch, setIsFecth] = useState(false);
  const navigator = useNavigation();
  // const [credentialsInvalid,setCredentialsInvalid] = ({

  // })

  const cancelHander = () => {
    navigator.navigate('WelcomeScreen');
  };
  const [_fname, setFname] = useState('');
  const [_lname, setlname] = useState('');
  const [_email, setEmail] = useState('');
  const [_tell, setTell] = useState('');
  const [_password, setPassword] = useState('');
  const [_confirmPassword, setComfirmPassword] = useState('');
  const [_houseOn, setHouseOn] = useState('');
  const [_village, SetVillage] = useState('');
  const [_subDistrict, setSubDistrict] = useState('');
  const [_district, setDistrict] = useState('');
  const [_province, setProvince] = useState('');
  const [_postalCode, setPostalCode] = useState('');

  const submitHandler = async () => {
    setFname(_fname.trim());
    setlname(_lname.trim());
    setEmail(_email.trim());
    setPassword(_password.trim());

    const emailIsValid = _email.includes('@');
    const passwordIsValid = _password.length > 6;
    const conformpasswordIsValid = _confirmPassword.length > 6;
    const passwordsAreEqual = passwordIsValid === conformpasswordIsValid;

    if (!emailIsValid || !passwordIsValid || !passwordsAreEqual) {
      Alert.alert('ข้อมูลไม่ถูกต้อง', 'ตรวจสอบข้อมูลอีกครั้ง!');
      return;
    }
    // console.log(_email);
    const user = {
      email: _email,
      f_name: _fname,
      l_name: _lname,
      tell: _tell,
      password: _password,
      house_on: _houseOn,
      village: _village,
      sub_district: _subDistrict,
      district: _district,
      province: _province,
      postal_code: _postalCode,
      status: 'User',
    };
    try {
      setIsFecth(true);
      const res = await fetch('http://10.0.2.2:8080/auth/signup', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async Response => {
          const res = await Response.json();
          if (res.message === 'Validation failed.') {
            Alert.alert(
              'ไม่สามารถลงทะเบียนได้ ',
              `โปรดตรวจสอบข้อมูล \n${res.data[0].msg} \n${res.data[0].value}
              `,
            );
            setIsFecth(false);
            return;
          }
          Alert.alert('ลงทะเบียนเรียบร้อย!');
          setIsFecth(false);
          cancelHander();
        })
        .catch(err => {
          Alert.alert(err);
          Alert.alert(
            'ไม่สามารถลงทะเบียนได้ ',
            `โปรดตรวจสอบข้อมูล \n${err.data[0].msg}`,
          );
        });
    } catch (err) {
      Alert.alert('ไม่สามารถลงทะเบียนได้', err);
    }
  };
  if (isFetch) {
    return <LoadingOverlay message="กำลังลงทะเบียน..." />;
  }
  return (
    <View style={styles.contianerRoot}>
      <Text
        style={{
          fontSize: Textstyles.fontTitle,
          fontFamily: Textstyles.fontMainMedium,
          color: 'black',
          padding: 10,
        }}>
        ลงทะเบียน
      </Text>
      <ScrollView>
        <TextInput
          placeholder="ชื่อ"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setFname(text)}
        />
        <TextInput
          placeholder="นามสกุล"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setlname(text)}
        />
        <TextInput
          placeholder="อีเมล์"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="เบอร์โทรศัพท์"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setTell(text)}
        />
        <TextInput
          placeholder="รหัสผ่าน"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          placeholder="ยืนยันรหัสผ่าน"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setComfirmPassword(text)}
        />
        <TextInput
          placeholder="เลขที่"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setHouseOn(text)}
        />
        <TextInput
          placeholder="หมู่บ้าน"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => SetVillage(text)}
        />
        <TextInput
          placeholder="ตำบล"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setSubDistrict(text)}
        />
        <TextInput
          placeholder="อำเภอ"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setDistrict(text)}
        />
        <TextInput
          placeholder="จังหวัด"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setProvince(text)}
        />
        <TextInput
          placeholder="รหัสไปรษณีย์"
          keyboardType="default"
          style={styles.input}
          onChangeText={text => setPostalCode(text)}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            bgcolor={Colors.primary}
            title={'ลงทะเบียน'}
            fontcolor={'black'}
            onPress={submitHandler}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CancelButton
            title={'ยกเลิก'}
            fontcolor={'black'}
            onPress={cancelHander}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterSreen;

const styles = StyleSheet.create({
  contianerRoot: {
    flex: 1,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 5,
  },
});
