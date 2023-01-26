import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
const ListShowpayment = ({data, onPress, status}) => {
  
  const date = new Date(data.date);
  const datefomat = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Pressable onPress={onPress}>
      <View style={styles.rootContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.bodyShowPaymentStatus}>
            <View
              style={{
                backgroundColor: status ? 'green' : 'red',
                borderRadius: 180,
              }}>
              <FontAwesome5
                name="circle"
                size={32}
                color={status ? 'green' : 'red'}
              />
              {/* circle */}
            </View>
          </View>
          <View>
            <Text style={styles.text}>{status ? 'ชำระแล้ว' : 'รอการชำระ'}</Text>
            <Text style={styles.text}>{datefomat}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ListShowpayment;

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 10,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 5,
    marginTop: 2,
  },
  bodyShowPaymentStatus: {
    padding: 10,
  },
});
