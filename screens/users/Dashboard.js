import {ScrollView, StyleSheet, Text, View, Linking} from 'react-native';
import React from 'react';
import Cardinformation from '../../components/ui/Cardinformation';
import ListShowpayment from '../../components/ui/ListShowpayment';
import Textstyles from '../../constants/Textstyles';
const imgInof1 = require('../../assets/images/info1.png');
const imgInof2 = require('../../assets/images/info2.png');
const informatio1 = () => {
  Linking.openURL('https://nongtakya.go.th/');
};
const informatio2 = () => {
  Linking.openURL('https://nongtakya.go.th/public/');
};
const Dashboard = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>ภาพรวม</Text>
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
      <ScrollView
        style={styles.bodyScrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ListShowpayment />
        <ListShowpayment />
        <ListShowpayment />
        <ListShowpayment />
      </ScrollView>
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
