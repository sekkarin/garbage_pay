/* eslint-disable react-hooks/exhaustive-deps */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  FlatList,
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Cardinformation from '../../components/ui/Cardinformation';
import ListShowpayment from '../../components/ui/ListShowpayment';
import Textstyles from '../../constants/Textstyles';
import { useNavigation } from '@react-navigation/native';
import ErrorOverlay from '../../components/ErrorUI/ErrorOverlay';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import EmptyData from '../../components/ErrorUI/EmptyData';
import { AuthContext } from '../../store/auth-context';
const imgInof1 = require('../../assets/images/info1.png');
const imgInof2 = require('../../assets/images/info2.png');
const informatio1 = () => {
  Linking.openURL('https://nongtakya.go.th/');
};
const informatio2 = () => {
  Linking.openURL('https://nongtakya.go.th/public/');
};

const Dashboard = () => {
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
    async function intiOrder() {
      try {
        setIsFecth(true);
        await fetch(
          'https://starfish-app-3rla8.ondigitalocean.app/user/orderInit',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + authCtx.token,
            },
          },
        )
          .then(async respone => await respone.json())
          .then(result => {
            setIsFecth(false);
            // console.log(result);
          })
          .catch(err => {
            console.log(err);
            console.log(err);
            setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
          });
      } catch (err) {
        // console.log(err);
        // setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
      }
    }
    intiOrder();
  }, []);
  useEffect(() => {
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
      } catch (err) { }
    }
    const focusHandler = navigation.addListener('focus', () => {
      getInvoice();
      getOrderCheck();
    });
    return focusHandler;
  }, [navigation]);

  console.log(_dataInvoce);

  if (error && !isFetch) {
    return <ErrorOverlay message={error} onConFirm={errorHandler} />;
  }
  if (isFetch) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>ภาพรวม </Text>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Cardinformation
          img={imgInof1}
          onPress={informatio1}
          msg={'ข้อมูลในองค์กร'}
        />
        <Cardinformation
          img={imgInof2}
          onPress={informatio2}
          msg={'รายละเอียดการจ่ายขยะ'}
        />
      </ScrollView>

      <Text style={styles.title}>ภาพรวมการจ่าย</Text>
      {_dataInvoce.length !== 0 ? (
        <FlatList
          style={{ marginBottom: 5, marginTop: 10, height: 200 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          extraData={item => item.id}
          data={_dataInvoce}
          renderItem={({ item }) => {
            return (
              // console.log(item);
              <ListShowpayment
                data={item}
                status={InvoiceId.toString().includes(item.id)}
                onPress={() => {
                  console.log(InvoiceId.toString().includes(item.id));
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

export default Dashboard;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 12,
  },
  title: {
    fontSize: Textstyles.fontTitle,
    color: 'black',
    fontWeight: '200',
  },
  bodyScrollView: {
    height: 200,
  },
});
