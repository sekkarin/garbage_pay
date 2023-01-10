const {createBottomTabNavigator} = require('@react-navigation/bottom-tabs');
import {StyleSheet, Image, Button, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Colors from '../constants/Colors';
import Textstyles from '../constants/Textstyles';
import AddBillScreen from '../screens/admin/AddBillScreen';
import EditBillScreen from '../screens/admin/EditBillScreen';
import EditUserScreen from '../screens/admin/EditUserScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {AuthContext} from '../store/auth-context';
import Dashboard from '../screens/users/Dashboard';
import Payment from '../screens/users/Payment';
import Profile from '../screens/users/Profile';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackAdminManage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: 'black',
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: {height: 83},
        tabBarLabelStyle: {fontSize: 18, color: 'black'}
      }}>
      <Tab.Screen
        options={{
          title: 'หน้าแรก',
          tabBarIcon: () => {
            return <Icon name="home" size={47} color={Colors.secondary} />;
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
              <Image
                source={require('../assets/icons/coin.png')}
                style={{height: 47, width: 47}}
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
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => {
            return (
              <Image
                source={require('../assets/icons/more.png')}
                style={{height: 47, width: 47}}
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
