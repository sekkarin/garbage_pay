import * as React from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Colors from './constants/Colors';
import Textstyles from './constants/Textstyles';
import NavigationBill from './navigation/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './navigation/Main';
import WelcomeScreen from './screens/users/WelcomeScreen';
import RegisterSreen from './screens/users/RegisterSreen';
import LoginScreen from './screens/users/LoginScreen';
// import Colors from './constants/Colors';
const Stack = createNativeStackNavigator()

export default function App() {
  const [islogin, setIslogin] = React.useState(true)
  
  return (
    <NavigationContainer>
      {
        islogin ? (
          <Stack.Navigator screenOptions={{
            headerStyle: styles.headerStyle,
            headerTintColor: "black",
            headerTitleStyle: styles.headerTitleStyle,
            tabBarStyle: { height: 83 },
            tabBarLabelStyle: { fontSize: 18, color: "black" }
          }}>
            <Stack.Screen name='Main' component={Main}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name='Navigation'
              component={NavigationBill}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName='WelcomeScreen'>
              <Stack.Screen name='WelcomeScreen'
                component={WelcomeScreen}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen name='RegisterScreen'
                component={RegisterSreen}
                options={{ headerShown: false,headerStyle:{backgroundColor:Colors.primary}}}
              ></Stack.Screen>
              <Stack.Screen name='LoginScreen'
                component={LoginScreen}
                options={{ headerShown: false,headerStyle:{backgroundColor:Colors.primary}}}
              ></Stack.Screen>
            </Stack.Navigator>
        )
      }
    </NavigationContainer>

  );
}

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
    fontFamily: Textstyles.fontMainBold

  }
})

