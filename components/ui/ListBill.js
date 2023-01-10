import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Textstyles from '../../constants/Textstyles';
import {useNavigation} from '@react-navigation/native';

const ListBill = ({onPress, data}) => {
  // console.log(data.item);
  const navigator = useNavigation();
  const date = new Date(data.item.date);
  const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Pressable
      onPress={() => {
        navigator.navigate('Admin', {
          screen: 'EditBill',
          params: {id: data.item.id},
        });
      }}>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>บิลประจำเดือน {result.split(' ')[1]}</Text>
        <Text style={styles.dateText}>{result}</Text>
      </View>
    </Pressable>
  );
};

export default ListBill;

const styles = StyleSheet.create({
  bodyContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: Colors.secondary,
    marginVertical: 5,
    marginHorizontal: 10,
    // elevation:5,
    // shadowColor: "#000000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // shadowOffset: {
    //     width: 1,
    //     height: 3
    // },
    // backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: Textstyles.fontMainMedium,
    fontSize: Textstyles.fontText,
    fontWeight: 'bold',
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    fontFamily: Textstyles.fontMainLight,
    color: 'black',
    // fontWeight:'200'
    // font
  },
});
