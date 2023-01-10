import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
// import { Button } from 'react-native-vector-icons/dist/Ionicons'
import Textstyles from '../../constants/Textstyles';
import ListBill from '../../components/ui/ListBill';
import Colors from '../../constants/Colors';
import PrimaryButton from '../../components/ui/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import ErrorOverlay from '../../components/ErrorUI/ErrorOverlay';
import EmptyData from '../../components/ErrorUI/EmptyData';

const BillScreen = ({navigation}) => {
  // const navigation = useNavigation()
  let [_databill, setBill] = useState([]);
  const [isFetch, setIsFecth] = useState(true);
  const [error, setError] = useState();
  const EditUserHandlerNavgaitor = () => {
    navigation.navigate('Admin', {screen: 'EditBill'});
  };
  const AddHandlerNavgaitor = () => {
    navigation.navigate('Admin', {screen: 'AddBill'});
  };
  useEffect(() => {
    async function getBill() {
      const data = [];
      try {
        setIsFecth(true);
        const res = await fetch('http://10.0.2.2:8080/admin/invoices', {
          method: 'GET',
        });
        const dataBill = await res.json();

        for (const key in dataBill.invoices) {
          const _dataobject = {
            id: dataBill.invoices[key]._id,
            anmount: dataBill.invoices[key].amount,
            description: dataBill.invoices[key].description,
            date: dataBill.invoices[key].createdAt,
          };
          data.push(_dataobject);
        }
        // reset array an emtry
        _databill = [];
        setBill(currData => [...data]);
        setIsFecth(false);
      } catch (err) {
        // console.log(err);
        setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
      }
    }
    const focusHandler = navigation.addListener('focus', () => {
      getBill();
    });
    return focusHandler;
  }, [navigation]);

  const errorHandler = () => {
    setError(null);
  };
  if (error && !isFetch) {
    return (
      <ErrorOverlay message={error} onConFirm={errorHandler}></ErrorOverlay>
    );
  }

  if (isFetch) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.titltBill}>รายการบิล</Text>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-start', height: '80%'}}>
        {_databill.length !== 0 ? (
          <FlatList
            style={{marginBottom: 5, marginTop: 10, height: '70%'}}
            extraData={item => item.id}
            data={_databill}
            renderItem={item => {
              return (
                <ListBill
                  data={item}
                  onPress={EditUserHandlerNavgaitor}></ListBill>
              );
            }}></FlatList>
        ) : (
          <EmptyData message={'ไม่มีข้อมูล'} />
        )}
      </View>

      <View style={styles.containerButton}>
        <PrimaryButton
          title={'ออกบิล'}
          bgcolor={Colors.primary}
          fontcolor={'black'}
          onPress={AddHandlerNavgaitor}
        />
      </View>
    </View>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 10,
  },
  titltBill: {
    fontSize: Textstyles.fontTitle,
    fontFamily: Textstyles.fontMainMedium,
    color: 'black',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  containerButton: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
