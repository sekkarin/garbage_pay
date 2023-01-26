import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Textstyles from '../../constants/Textstyles';
import Colors from '../../constants/Colors';

const ListShowUser = ({onPress, data}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyCard}>
          <View style={styles.imageBody}>
            <Image
              style={styles.image}
              source={require('../../assets/icons/default_user.png')}></Image>
          </View>
          <View style={styles.bodyTitle}>
            <Text style={styles.title}>{`${data.f_name} ${data.l_name}`}</Text>
            <Text
              style={
                styles.dateText
              }>{`${data.house_on} ม.${data.village} ต.${data.sub_district} อ.${data.district}...`}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ListShowUser;

const styles = StyleSheet.create({
  bodyContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: Colors.secondary,
    marginVertical: 5,
    marginHorizontal: 10,
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
  },
  image: {
    width: 30,
    height: 30,
  },
  imageBody: {
    margin: 5,
  },
  bodyCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyTitle: {
    marginHorizontal: 10,
    overflow:'hidden'
  },
});
