/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import { Button } from 'react-native-vector-icons/dist/Ionicons'
import Textstyles from '../../constants/Textstyles';
import Colors from '../../constants/Colors';
// import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ListShowUser from '../../components/ui/ListShowUser';
import EmptyData from '../../components/ErrorUI/EmptyData';
import LoadingOverlay from '../../components/ui/LoadingOverlay';


const ManageUserScreen = ({navigation}) => {
  // const navigation = useNavigation();
  let [_users, setUser] = useState([]);
  const [isFetch, setIsFecth] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getBill() {
      const data = [];
      try {
        setIsFecth(true);
        const res = await fetch('https://starfish-app-3rla8.ondigitalocean.app/user/getuser', {
          method: 'GET',
        });
        const userJson = await res.json();
        // console.log(userJson);
        for (const key in userJson.users) {
          const _dataobject = {
            id: userJson.users[key]._id,
            f_name: userJson.users[key].f_name,
            l_name: userJson.users[key].l_name,
            house_on: userJson.users[key].house_on,
            village: userJson.users[key].village,
            district: userJson.users[key].district,
            sub_district: userJson.users[key].sub_district,
            
          };
          data.push(_dataobject);
          // console.log(data);
        }
        // reset array an emtry
        _users = [];
        setUser(currData => [...data]);
        setIsFecth(false);
      } catch (err) {
        // console.log(err);
        setError('ไม่สามารถดึงข้อมูลจาก Server ได้');
      }
    }
    const focusHandler = navigation.addListener('focus', () => {
      getBill();
    });
    return focusHandler;
  }, [navigation]);

  const errorHandler = () => {
    setError(null);
  };

  if (isFetch) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '85%'}}>
          <TextInput
            placeholder="ค้นหารายชื่อ"
            keyboardType="default"
            style={styles.input}
          />
        </View>
        <View>
          <Pressable style={styles.submitbody}>
            <Icon name="search" color={'black'} size={31} />
          </Pressable>
        </View>
      </View>

      <View style={{flexGrow: 1, justifyContent: 'flex-start', height: '80%'}}>
        {_users.length !== 0 ? (
          <FlatList
            style={{marginBottom: 5, marginTop: 10, height: '70%'}}
            extraData={item => item.id}
            data={_users}
            renderItem={({item}) => {
              return (
                <ListShowUser
                  data={item}
                  onPress={() => {
                    navigation.navigate('Admin', {
                      screen: 'EditUserScreen',
                      params: {item: item},
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
    </View>
  );
};

export default ManageUserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 10,
  },
  titltBill: {
    fontSize: Textstyles.fontTitle,
    fontFamily: Textstyles.fontMainMedium,
    color: 'black',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  containerButton: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
  },
  submitbody: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
