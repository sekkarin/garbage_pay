/* eslint-disable react/react-in-jsx-scope */
const {createBottomTabNavigator} = require('@react-navigation/bottom-tabs');
import {StyleSheet, Image, Pressable} from 'react-native';
import Colors from '../constants/Colors';
import Textstyles from '../constants/Textstyles';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/users/Dashboard';
import Payment from '../screens/users/Payment';
import Profile from '../screens/users/Profile';
import {Icon, Button, Avatar} from '@rneui/base';
import {useContext} from 'react';
import {AuthContext} from '../store/auth-context';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackAdminManage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: 'black',
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: {height: 83},
        tabBarLabelStyle: {fontSize: 18},
        headerRight: () => {
          return (
            <Avatar
              size={32}
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
            />
          );
        },
      }}>
      <Tab.Screen
        options={{
          title: 'หน้าแรก',
          tabBarIcon: () => {
            return (
              <Icon
                name="home"
                type="fontAwesome5"
                size={47}
                color={Colors.secondary}
              />
            );
          },
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          title: 'ชำระเงิน',
          tabBarIcon: () => {
            return (
              <Icon
                name="dollar"
                type="fontisto"
                // user-alt
                size={47}
                color={Colors.secondary}
              />
            );
          },
        }}
        name="Payment"
        component={Payment}
      />
      <Tab.Screen
        options={{
          title: 'โปรไฟล์',
          // tabBarHideOnKeyboard: true,
          tabBarIcon: () => {
            return (
              <Icon
                name="person"
                type="antDesign"
                size={47}
                color={Colors.secondary}
              />
            );
          },
          headerRight: () => {
            return (
              <Icon
                name="exit-to-app"
                type="materialcommunityicons"
                // user-alt
                size={32}
                color={Colors.secondary}
                style={{marginHorizontal: 15}}
                onPress={() => {
                  authCtx.logout();
                }}
              />
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
// eslint-disable-next-line no-undef
export default Admin = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: 'black',
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: {height: 83},
        tabBarLabelStyle: {fontSize: 18, color: 'black'},
        headerLargeStyle: {backgroundColor: 'black'},
        headerRight: () => {
          <Button title="Hello" color="#fff" />;
        },
      }}>
      <Stack.Screen
        name="StackAdminManage"
        component={StackAdminManage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    height: 65,
  },
  headerTitleStyle: {
    fontSize: Textstyles.fontTitle,
    fontFamily: Textstyles.fontMainBold,
  },
  iconRight: {
    marginRight: 10,
  },
});
