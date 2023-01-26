/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from '@rneui/themed';
import {AuthContext} from '../../store/auth-context';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
const Profile = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [isFetch, setIsFecth] = useState(true);
  const [dataUser, setUserEdite] = useState({});
  useEffect(() => {
    async function getinvoce() {
      try {
        setIsFecth(true);
        const res = await fetch(
          'https://starfish-app-3rla8.ondigitalocean.app/user/getuser/' + authCtx.data.userId,
          {
            method: 'GET',
          },
        );
        const user = await res.json();
        // console.log(user);
        setUserEdite(user.user);
        setIsFecth(false);
        // console.log(dataUser);
      } catch (err) {
        console.log(err);
      }
    }
    // getinvoce();

    const focusHandler = navigation.addListener('focus', () => {
      getinvoce();
      // getBill()
    });
    return focusHandler;
    // data = dataBill
  }, [navigation]);

  if (isFetch) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{marginVertical: 20}}
        // avatarStyle={styles.avatar}
        size={200}
        rounded
        source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
      />
      <Text
        style={styles.title}>{`${dataUser.f_name} ${dataUser.l_name}`}</Text>
      <View
        style={{
          justifyContent: 'flex-start',
          flex: 1,
          alignItems: 'flex-start',
          width: '100%',
        }}>
        <Text style={styles.title}>ที่อยู่</Text>
        <Text
          style={
            styles.text
          }>{`${dataUser.house_on} ม.${dataUser.village} ต.${dataUser.sub_district} อ.${dataUser.district} จ.${dataUser.province} ${dataUser.postal_code}`}</Text>
        <Text style={styles.title}>อีเมล์</Text>
        <Text style={styles.text}>{dataUser.email}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 13,
  },
  avatar: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {fontSize: 16, color: 'black', marginLeft: 4},
});
