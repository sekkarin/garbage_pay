import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Admin from './Admin';
import AuthScreen from './AuthScreen';
import {useContext} from 'react';
import {AuthContext} from '../store/auth-context';
import User from './User';

const Stack = createNativeStackNavigator();
// eslint-disable-next-line no-undef
export default Navigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authCtx.isAuthenticate && (
          <Stack.Screen
            name="authScreen"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        )}
        {authCtx.isAuthenticate &&
          (authCtx.data.status === 'Admin' ? (
            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="User"
              component={User}
              options={{headerShown: false}}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
