import { View, StyleSheet, Text, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'
// import { Button } from 'react-native-vector-icons/dist/Ionicons'
import Textstyles from '../../constants/Textstyles'
import ListBill from '../../components/ui/ListBill'
import Colors from '../../constants/Colors'
import PrimaryButton from '../../components/ui/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/dist/Ionicons'

const ManageUserScreen = () => {
    const navigator = useNavigation()
    const EditUserHandlerNavgaitor = () => {

        navigator.navigate("Navigation", { screen: "EditeUser" })
    }

    return (
        <View style={styles.rootContainer}>

            <View style={{ flexDirection: "row" }}>
                <View style={{width:"85%"}}>
                    <TextInput placeholder='ค้นหารายชื่อ' keyboardType='default' style={styles.input}></TextInput>
                </View>
                <View>
                    <Pressable style={styles.submitbody} >
                        <Icon name='search'  color={"black"} size={31} ></Icon>
                    </Pressable>
                </View>
            </View>

            <View style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                <ScrollView style={{ marginBottom: 5, marginTop: 10, height: "70%" }}>

                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditUserHandlerNavgaitor}></ListBill>

                </ScrollView>
            </View>
        </View>
    )
}

export default ManageUserScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 10

    },
    titltBill: {
        fontSize: Textstyles.fontTitle,
        fontFamily: Textstyles.fontMainMedium,
        color: 'black',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    containerButton: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
    },
    submitbody:{
        backgroundColor:Colors.primary,
        alignItems:'center',
        padding:10,
        borderRadius:10
    }
})