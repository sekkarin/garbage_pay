import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import Textstyles from '../../constants/Textstyles';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Colors from '../../constants/Colors';
import CancelButton from '../../components/ui/CancelButton';
import SelectStatus from '../../components/ui/SelectStatus';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {AuthContext} from '../../store/auth-context';

const AddBillScreen = ({navigation}) => {
  const [isFetch, setIsFecth] = useState(false);
  const [_amount, setAmount] = useState();
  const [_desc, setDesc] = useState('');
  // ปัญหา state ไม่อัพตาม
  let [_status, setStatus] = useState(null);
  const authCtx = useContext(AuthContext);

  const handleChangeValue = e => {
    setStatus((_status = e.value));
  };
  const addBillhander = async () => {
    try {
      // console.log(typeof _amount, _amount, _status);
      const amountIsValid = !isNaN(_amount) && _amount > 0;
      const descriptionIsValid = _desc.trim().length > 0;
      const statusIsValid = _status === null;
      if (!amountIsValid || !descriptionIsValid || statusIsValid) {
        Alert.alert('ป้อนข้อมูลไม่ถูกต้อง ');
        return;
      }
      const data = {
        amount: _amount,
        description: _desc,
        status: _status,
      };
      setIsFecth(true);
      // console.log(data);
      await fetch('https://starfish-app-3rla8.ondigitalocean.app/admin/invoices/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Baere ' + authCtx.token,
        },
      }).then(() => {
        Alert.alert('เพิ่มบิลสำเร็จ');
        navigation.goBack();
      });
      setIsFecth(false);
    } catch (err) {
      Alert.alert('เพิ่มบิลไม่สำเร็จ');
    }
  };

  if (isFetch) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>ออกค่าชำระขยะ</Text>
      <View style={{flexGrow: 2}}>
        <TextInput
          onChangeText={text => setAmount(text)}
          placeholder="จำนวนเงิน"
          keyboardType="number-pad"
          style={styles.input}
        />
        <TextInput
          onChangeText={text => setDesc(text)}
          placeholder="คำอธิบาย"
          keyboardType="default"
          style={[styles.input, styles.textMultiLine]}
        />
        <SelectStatus onChange={handleChangeValue} />
      </View>
      <View style={{flexGrow: 0, paddingVertical: 15}}>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            bgcolor={Colors.primary}
            title={'ออกค่าชำระ'}
            fontcolor={'black'}
            onPress={addBillhander}
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

export default AddBillScreen;

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
    fontFamily: Textstyles.fontMainBold,
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
  textMultiLine: {
    height: 150,
    textAlignVertical: 'top',
  },
});
