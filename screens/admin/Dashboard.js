/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardAmount from '../../components/ui/CardAmount';
import Colors from '../../constants/Colors';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const Dashboard = ({navigation}) => {
  const [isFetch, setIsFecth] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    async function getInfo() {
      try {
        setIsFecth(true);
        const res = await fetch('https://starfish-app-3rla8.ondigitalocean.app/dashboard/information', {
          method: 'GET',
        });
        const data = await res.json();
        // console.log(data);
        setData(data);
        setIsFecth(false);
      } catch (err) {
        console.log(err);
      }
    }
    // getinvoce();

    const focusHandler = navigation.addListener('focus', () => {
      getInfo();
      // getBill()
    });
    return focusHandler;
    // data = dataBill
  }, [navigation]);

  // console.log(data);
  if (isFetch) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.rootContainer}>
      <View style={{flexGrow: 1}}>
        <View style={styles.cardContainer}>
          <CardAmount
            color={Colors.secondary}
            title={'จำนวนสมาชิก'}
            fontColor={'white'}
            value={data.totaluser}
          />
          <CardAmount
            color={Colors.primary}
            title={'ยอดรวม'}
            fontColor={'black'}
            value={data.total}
          />
        </View>
      </View>
      <View style={{flexGrow: 2}}>
        <View style={styles.containerChart}>
          <View style={styles.bodyChart}>
            <Text>Chart</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 15,
    // alignContent:'flex-start'
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    // alignItems:"center",
  },
  containerChart: {
    flex: 1,
    flexDirection: 'column',
  },
  bodyChart: {
    backgroundColor: Colors.primary,
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
