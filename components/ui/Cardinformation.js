import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Textstyles from '../../constants/Textstyles';

const Cardinformation = ({img, msg, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.rootContainer}>
        <Text style={styles.textbody}>
          <Text style={styles.text}>{msg}</Text>
        </Text>
        <Image source={img} style={{width: 272, height: 254}} />
      </View>
    </Pressable>
  );
};

export default Cardinformation;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'gray',
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  text: {
    fontSize: Textstyles.fontTitle,
    fontWeight: 'bold',
    color: 'black',
    // margin:
  },
  textbody: {
    zIndex: 10,
    position: 'absolute',
    bottom: 5,
    left: 7,
  },
});
