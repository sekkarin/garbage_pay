/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import {useStripe} from '@stripe/stripe-react-native';
import {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Screen} from 'react-native-screens';
import {AuthContext} from '../../store/auth-context';

export default function CheckoutScreen({item, id_order}) {
  // console.log(item);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const API_URL = 'http://10.0.2.2:8080';
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  // const API_URL =
  //   'https://starfish-app-3rla8.ondigitalocean.app';
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
        Alert.alert('ชำระเงินสำเร็จ');
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('ชำระเงินไม่สำเร็จ');
      });
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      'https://starfish-app-3rla8.ondigitalocean.app/payment-sheet',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.token,
        },
        body: JSON.stringify({price: item.anmount}),
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: authCtx.data.name,
        userId: authCtx.data.userId,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`ยกเลิกการชำระ: ${error.code}`, error.message);
    } else {
      setLoading(false);
      Checkouthendler();
      // Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      initializePaymentSheet();
    });
    return focusHandler;
  }, [initializePaymentSheet]);

  return (
    <Screen>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </Screen>
  );
}
