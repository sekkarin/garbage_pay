/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ListShowpayment from '../../components/ui/ListShowpayment';
// import CheckoutScreen from './CheckoutScreen';
import {useStripe} from '@stripe/stripe-react-native';
import {Button} from '@rneui/base';
import {AuthContext} from '../../store/auth-context';
import {useNavigation} from '@react-navigation/native';

const Detailinvoice = ({route}) => {
  const navigation = useNavigation();
  const id_order = route.params.id_order;
  const status = route.params.status;
  const item = route.params.item;
  // console.log(id_order);
  const date = new Date(item.date);
  const authCtx = useContext(AuthContext);
  const datefomat = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const Checkouthendler = async () => {
    await fetch(
      'https://starfish-app-3rla8.ondigitalocean.app/user/checkout/' + id_order,
      {
        method: 'POST',
        body: JSON.stringify({invoice_id: item.id}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.token,
        },
      },
    )
      .then(async result => {
        console.log(await result.json());
        Alert.alert('ชำระเงินสำเร็จ');
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('ชำระเงินไม่สำเร็จ');
      });
  };
  const CheckoutButton = () => {
    return (
      <Button
        containerStyle={{width: '80%', marginBottom: 25}}
        buttonStyle={{borderRadius: 10, backgroundColor: '#32645C'}}
        titleStyle={{fontSize: 24}}
        onPress={Checkouthendler}
        title={'ชำระเงิน'}></Button>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 10}}>
        <ListShowpayment data={item} status={status} />
      </View>
      <View style={{flexGrow: 1}}>
        <Text style={styles.title}>รายละเอียด</Text>
        <View style={styles.textBody}>
          <Text style={styles.text}>วันที่</Text>
          <Text style={styles.text}>{datefomat}</Text>
        </View>
        <View style={styles.textBody}>
          <Text style={styles.text}>จำนวนเงิน</Text>
          <Text style={styles.text}>{item.anmount}</Text>
        </View>
        <View style={styles.textBody}>
          <Text style={styles.text}>คำอธิบาย</Text>
          <Text style={styles.text}>{item.description}</Text>
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          // width: '100%',
        }}>
        {status ? <></> : <CheckoutButton />}
      </View>
    </View>
  );
};

export default Detailinvoice;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '200',
    marginVertical: 10,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  textBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
});
