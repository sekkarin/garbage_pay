import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
// import { Button } from 'react-native-vector-icons/dist/Ionicons'
import Textstyles from '../../constants/Textstyles'
import ListBill from '../../components/ui/ListBill'
import Colors from '../../constants/Colors'
import PrimaryButton from '../../components/ui/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
const BillScreen = () => {
    const navigator = useNavigation()
    const EditHandlerNavgaitor = () => {

        navigator.navigate("NavigationBill", { screen: "EditBill" })
    }
    const AddHandlerNavgaitor = () => {

        navigator.navigate("NavigationBill", { screen: "AddBill" })
    }

    return (
        <View style={styles.rootContainer}>

            <View>
                <Text style={styles.titltBill}>รายการบิล</Text>
            </View>

            <View style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                <ScrollView style={{ marginBottom: 5, marginTop: 10, height: "70%" }}>

                    <ListBill onPress={EditHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditHandlerNavgaitor}></ListBill>
                    <ListBill onPress={EditHandlerNavgaitor}></ListBill>

                </ScrollView>
            </View>
            <View style={styles.containerButton}>

                <PrimaryButton title={"ออกบิล"} bgcolor={Colors.primary}
                    fontcolor={"black"}
                    onPress={AddHandlerNavgaitor}
                ></PrimaryButton>
            </View>

        </View>
    )
}

export default BillScreen

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
    }

})