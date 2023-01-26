/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import ListShowpayment from '../../components/ui/ListShowpayment';
import Textstyles from '../../constants/Textstyles';
import {useNavigation} from '@react-navigation/native';
import ErrorOverlay from '../../components/ErrorUI/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import EmptyData from '../../components/ErrorUI/EmptyData';
import {AuthContext} from '../../store/auth-context';
import ListShowpayment from '../../components/ui/ListShowpayment';
import {useLayoutEffect} from 'react';

const Payment = () => {
  const navigation = useNavigation();
  let [_dataInvoce, setDataInvoce] = useState([]);
  let [_dataOrder, setDataOrder] = useState({});
  let [InvoiceId, setInvoiceId] = useState('');
  const [isFetch, setIsFecth] = useState(true);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  const errorHandler = () => {
    setError(null);
  };
  useLayoutEffect(() => {
    async function getInvoice() {
      const data = [];
      try {
        setIsFecth(true);
        const res = await fetch(
          'https://starfish-app-3rla8.ondigitalocean.app/admin/invoices',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + authCtx.token,
            },
          },
        ).catch(err => {
          console.log(err);
          console.log(err);
          setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
        });
        const dataJson = await res.json();
        // console.log(dataJson);
        for (const key in dataJson.invoices) {
          const _dataJson = {
            id: dataJson.invoices[key]._id,
            anmount: dataJson.invoices[key].amount,
            description: dataJson.invoices[key].description,
            date: dataJson.invoices[key].createdAt,
          };
          data.push(_dataJson);
        }
        // reset array an emtry
        _dataInvoce = [];
        setDataInvoce(currData => [...data]);
        setIsFecth(false);
      } catch (err) { }
    }
    async function getOrderCheck() {
      try {
        setIsFecth(true);
        const resOrder = await fetch(
          'https://starfish-app-3rla8.ondigitalocean.app/user/order',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + authCtx.token,
            },
          },
        ).catch(err => {
          // console.log(err);
          // console.log(err);
          setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
        });
        const dataJson = await resOrder.json();
        // console.log('raw',dataJson);
        _dataOrder = {};
        setDataOrder(dataJson.order[0]);
        setInvoiceId(dataJson.order[0].invoice_id);
        // console.log(_dataOrder);
      } catch (err) {}
    }
    const focusHandler = navigation.addListener('focus', () => {
      getInvoice();
      getOrderCheck();
    });
    return focusHandler;
  }, [navigation]);
  if (error && !isFetch) {
    return <ErrorOverlay message={error} onConFirm={errorHandler} />;
  }
  if (isFetch) {
    return <LoadingOverlay />;
  }
  console.log(_dataOrder);
  console.log(_dataInvoce);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>รายการ </Text>
      {_dataInvoce.length !== 0 ? (
        <FlatList
          style={{marginBottom: 5, marginTop: 10, height: 200}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          extraData={item => item.id}
          data={_dataInvoce}
          renderItem={({item}) => {
            return (
              // console.log(item);
              <ListShowpayment
                data={item}
                status={InvoiceId.toString().includes(item.id)}
                onPress={() => {
                  // console.log(_dataOrder.toString() === item.id);
                  navigation.navigate('Detailinvoice', {
                    invoce_id: item.id,
                    status: InvoiceId.toString().includes(item.id),
                    item: item,
                    id_order: _dataOrder._id,
                  });
                }}
              />
            );
          }}
        />
      ) : (
        <EmptyData message={'ไม่มีข้อมูล'} />
      )}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 12,
    flex: 1,
  },
  title: {
    fontSize: Textstyles.fontTitle,
    color: 'black',
    fontWeight: '200',
  },
  bodyScrollView: {
    height: '80%',
  },
});

// export default Detailinvoice;
