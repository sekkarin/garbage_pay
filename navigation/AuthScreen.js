/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import RegisterSreen from '../screens/auth/RegisterSreen';
import LoginScreen from '../screens/auth/LoginScreen';
import Colors from '../constants/Colors';
const Stack = createNativeStackNavigator();
const AuthScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterSreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: Colors.primary },
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: Colors.primary },
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthScreen

const styles = StyleSheet.create({})