/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from '@rneui/themed';
import {AuthContext} from '../../store/auth-context';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import DocumentPicker from 'react-native-document-picker';
const Profile = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [isFetch, setIsFecth] = useState(true);
  const [dataUser, setUserEdite] = useState({});
  const [singleFile, setSingleFile] = useState(null);

  useEffect(() => {
    async function getinvoce() {
      try {
        setIsFecth(true);
        const res = await fetch(
          'https://starfish-app-3rla8.ondigitalocean.app/user/getuser/' +
            authCtx.data.userId,
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

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      // console.log('fileToUpload', fileToUpload);
      data.append('name', fileToUpload[0].name);
      data.append('image', {
        uri: fileToUpload[0].uri,
        name: fileToUpload[0].name,
        type: fileToUpload[0].type,
      });
      // data.append('name', fileToUpload.name);
      // data.append('uri', fileToUpload.uri);
      // data.append('type', fileToUpload.type);
      // console.log('DEBUG : ', authCtx.data.userId, 'data', data);
      let res = await fetch(
        'https://starfish-app-3rla8.ondigitalocean.app/user/uploadimage/' +
          authCtx.data.userId,
        {
          method: 'PUT',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + authCtx.token,
          },
        },
      );
      // let responseJson = await res.json();

      // console.log('responseJson', res.status);
      if (res.status === 201) {
        Alert.alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      Alert.alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });
      // console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        Alert.alert('Canceled');
      } else {
        // For Unknown Error
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
    uploadImage();
  };
  if (isFetch) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{marginVertical: 20}}
        onPress={selectFile}
        // avatarStyle={styles.avatar}
        size={200}
        rounded
        // source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
        source={{
          uri: authCtx.data.image
            ? authCtx.data.image
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        }}
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
        <TouchableOpacity
          // style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}></TouchableOpacity>
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
