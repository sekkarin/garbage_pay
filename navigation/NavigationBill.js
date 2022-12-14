import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Textstyles from '../constants/Textstyles';
import AddBillScreen from '../screens/admin/AddBillScreen';
import BillScreen from '../screens/admin/BillScreen';
import EditBillScreen from '../screens/admin/EditBillScreen';


const Stack = createNativeStackNavigator()
export default NavigationBill = () => {
    return (<Stack.Navigator screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: { height: 83 },
        tabBarLabelStyle: { fontSize: 18, color: "black" },
        headerLargeStyle:{backgroundColor:'black'}
      }}>
        <Stack.Screen name='EditBill' options={{title:'แก้ใขบิล'}}  component={EditBillScreen}>
        </Stack.Screen>
        <Stack.Screen name="AddBill" options={{title:'เพิ่มบิล'}} component={AddBillScreen}></Stack.Screen>
    </Stack.Navigator>)
}
const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        // borderRadius:20,
        height: 65,
      },
      headerTitleStyle: {
        fontSize: Textstyles.fontTitle,
        fontFamily: Textstyles.fontMainBold
    
      }
})