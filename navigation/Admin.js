const {createBottomTabNavigator} = require('@react-navigation/bottom-tabs');
import {StyleSheet, Image, Button, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Colors from '../constants/Colors';
import Textstyles from '../constants/Textstyles';
import Dashboard from '../screens/admin/Dashboard';
import BillScreen from '../screens/admin/BillScreen';
import ManageUserScreen from '../screens/admin/ManageUserScreen';
import AddBillScreen from '../screens/admin/AddBillScreen';
import EditBillScreen from '../screens/admin/EditBillScreen';
import EditUserScreen from '../screens/admin/EditUserScreen';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
        tabBarLabelStyle: {fontSize: 18, color: 'black'},
        headerRight: () => {
          return (
            <Pressable
              style={styles.iconRight}
              onPress={() => {
                authCtx.logout();
                console.log('leave');
              }}>
              <FontAwesome5
                name={'sign-out-alt'}
                size={35}
                color={Colors.secondary}></FontAwesome5>
            </Pressable>
          );
        },
      }}>
      <Tab.Screen
        options={{
          title: 'ภาพรวม',
          tabBarIcon: () => {
            return <Icon name="home" size={47} color={Colors.secondary} />;
          },
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          title: 'บิล',
          tabBarIcon: () => {
            return (
              <Image
                source={require('../assets/icons/coin.png')}
                style={{height: 47, width: 47}}
              />
            );
          },
        }}
        name="BillScrenn"
        component={BillScreen}
      />
      <Tab.Screen
        options={{
          title: 'จัดการสมาชิก',
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
        name="ManageUserScreen"
        component={ManageUserScreen}
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
      <Stack.Screen
        name="EditeUser"
        options={{title: 'แก้ใขข้อมูล'}}
        component={EditUserScreen}
      />

      <Stack.Screen
        name="EditBill"
        options={{title: 'แก้ใขบิล'}}
        component={EditBillScreen}
      />
      <Stack.Screen
        name="AddBill"
        options={{title: 'เพิ่มบิล'}}
        component={AddBillScreen}
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
