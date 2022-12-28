import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Textstyles from '../../constants/Textstyles'
import PrimaryButton from '../../components/ui/PrimaryButton'
import Colors from '../../constants/Colors'
import CancelButton from '../../components/ui/CancelButton'

const EditUserScreen = ({ navigation, route }) => {
    
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>นาย ทองดี ทองเค</Text>
            <View style={{ height: "65%" }}>
                <ScrollView>

                    <TextInput placeholder='ชื่อ' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='นามสกุล' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='อีเมล์' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='เบอร์โทรศัพท์' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='เลขที่' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='ตำบล' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='อำเภอ' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='จังหวัด' keyboardType='default' style={styles.input}></TextInput>
                    <TextInput placeholder='รหัสไปรษณีย์' keyboardType='default' style={styles.input}></TextInput>
                </ScrollView>
            </View>
            <View style={{ flexGrow: 0, paddingVertical: 15 }}>
                <View style={styles.buttonContainer}>

                    <PrimaryButton bgcolor={Colors.primary} title={"ตกลง"}
                        fontcolor={"black"}
                        onPress={() => { console.log("pressed"); }}
                    ></PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <CancelButton title={"ยกเลิก"} fontcolor={"black"} onPress={() => {
                        console.log('====================================');
                        console.log("pressed");
                        console.log('====================================');
                    }} ></CancelButton>
                </View>
            </View>
        </View>
    )
}

export default EditUserScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,

    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5
    },
    title: {
        fontFamily: Textstyles.fontMainLight,
        fontSize: Textstyles.fontTitle,
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        padding: 10

    },
    bodytitle: {
        marginHorizontal: 10
    },
    buttonContainer: {
        marginVertical: 5,
        // marginHorizontal
    }
})