import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
const ListShowpayment = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.bodyShowPaymentStatus}>
          <View
            style={{
              backgroundColor: 'red',
              borderRadius: 180,
            }}>
            <FontAwesome5 name="circle" size={32} color="red" />
            {/* circle */}
          </View>
        </View>
        <View>
          <Text style={styles.text}>รอการชำระ</Text>
          <Text style={styles.text}>13 กันยายน 2565</Text>
        </View>
      </View>
    </View>
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
