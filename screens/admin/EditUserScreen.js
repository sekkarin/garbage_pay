import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Textstyles from '../../constants/Textstyles';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Colors from '../../constants/Colors';
import CancelButton from '../../components/ui/CancelButton';
import {AuthContext} from '../../store/auth-context';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import ErrorOverlay from '../../components/ErrorUI/ErrorOverlay';
const EditUserScreen = ({navigation, route}) => {
  const item = route.params.item;
  const id = item.id;
  const [isFetch, setIsFecth] = useState(true);
  const [error, setError] = useState();
  const [userEdite, setUserEdite] = useState({});
  const [_fname, setFname] = useState('');
  const [_lname, setlname] = useState('');
  const [_email, setEmail] = useState('');
  const [_houseOn, setHouseOn] = useState('');
  const [_village, SetVillage] = useState('');
  const [_subDistrict, setSubDistrict] = useState('');
  const [_district, setDistrict] = useState('');
  const [_province, setProvince] = useState('');
  const [_postalCode, setPostalCode] = useState('');
  const authCtx = useContext(AuthContext);

  const upDateUser = async () => {
    try {
      //   const data = {
      //     amount: _amount || invoice.amount,
      //     description: _desc || invoice.description,
      //     status: _status != null ? _status : invoice.status,
      //   };
      //   console.log(userEdite);
      const user = {
        email: _email || userEdite.email,
        f_name: _fname || userEdite.f_name,
        l_name: _lname || userEdite.l_name,
        house_on: _houseOn || userEdite.house_on,
        village: _village || userEdite.village,
        sub_district: _subDistrict || userEdite.sub_district,
        district: _district || userEdite.district,
        province: _province || userEdite.province,
        postal_code: _postalCode || userEdite.postal_code,
        // status: 'User',
      };
      //   console.log(user.f_name.length > 0);
      const f_name = user.f_name.length > 0;
      const l_name = user.l_name.length > 0;
      const house_on = user.house_on.length > 0;
      const village = user.village.length > 0;
      const province = user.province.length > 0;
      const sub_district = user.sub_district.length > 0;
      const district = user.district.length > 0;
      const postal_code = user.postal_code.length > 0;
      const email = user.email.includes('@');

      //   console.log('213131', f_name);
      if (
        !f_name ||
        !l_name ||
        !house_on ||
        !village ||
        !province ||
        !sub_district ||
        !sub_district ||
        !district ||
        !postal_code ||
        !email
      ) {
        Alert.alert('ป้อนข้อมูลไม่ถูกต้อง ');
        return;
      }
      //   console.log(user);
      await fetch('https://starfish-app-3rla8.ondigitalocean.app/user/getuser/' + id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.token,
        },
      })
        .then(result => {
          Alert.alert('update succesed');
        })
        .catch(err => {
          Alert.alert('update not succsed');
        });
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
    }
  };

  useEffect(() => {
    async function getinvoce() {
      try {
        setIsFecth(true);
        const res = await fetch('https://starfish-app-3rla8.ondigitalocean.app/user/getuser/' + id, {
          method: 'GET',
        });
        const user = await res.json();
        // console.log(user);
        setUserEdite(user.user);
        setIsFecth(false);
      } catch (err) {
        console.log(err);
      }
    }
    // getinvoce();

    const focusHandler = navigation.addListener('focus', () => {
      getinvoce();
      // getBill()
    });
    return focusHandler;
    // data = dataBill
  }, [id, navigation]);
  //   console.log(userEdite);
  if (isFetch) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{`${item.f_name} ${item.l_name}`}</Text>
      <View style={{height: '65%'}}>
        <ScrollView>
          <TextInput
            onChangeText={setFname}
            placeholder={userEdite.f_name}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setlname}
            placeholder={userEdite.l_name}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setEmail}
            placeholder={userEdite.email}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setHouseOn}
            placeholder={userEdite.house_on}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={SetVillage}
            placeholder={userEdite.village}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setSubDistrict}
            placeholder={userEdite.sub_district}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setDistrict}
            placeholder={userEdite.district}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setProvince}
            placeholder={userEdite.province}
            keyboardType="default"
            style={styles.input}
          />
          <TextInput
            onChangeText={setPostalCode}
            placeholder={userEdite.postal_code}
            keyboardType="default"
            style={styles.input}
          />
        </ScrollView>
      </View>
      <View style={{flexGrow: 0, paddingVertical: 15}}>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            bgcolor={Colors.primary}
            title={'ตกลง'}
            fontcolor={'black'}
            onPress={upDateUser}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CancelButton
            title={'ยกเลิก'}
            fontcolor={'black'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
  rootContainer: {
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
  title: {
    fontFamily: Textstyles.fontMainLight,
    fontSize: Textstyles.fontTitle,
    color: 'black',
    marginHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    padding: 10,
  },
  bodytitle: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 5,
    // marginHorizontal
  },
});
