import * as React from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Colors from './constants/Colors';
import Textstyles from './constants/Textstyles';
import NavigationBill from './navigation/NavigationBill';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './navigation/Main';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
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
        <Stack.Screen name='NavigationBill'
          component={NavigationBill}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
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

