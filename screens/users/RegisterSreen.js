import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import PrimaryButton from '../../components/ui/PrimaryButton';
import Colors from '../../constants/Colors';
import CancelButton from '../../components/ui/CancelButton';
import Textstyles from '../../constants/Textstyles';
import { useNavigation } from '@react-navigation/native';

const RegisterSreen = () => {
    const navigator = useNavigation()
    const cancelHander = () => {
        navigator.navigate("WelcomeScreen")
    }
    return (
        <View style={styles.contianerRoot}>
            <Text style={{
                fontSize: Textstyles.fontTitle,
                fontFamily: Textstyles.fontMainMedium,
                color: 'black',            
                padding:10
            }}>ลงทะเบียน</Text>
            <ScrollView>
                <TextInput placeholder='ชื่อ' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='นามสกุล' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='อีเมล์' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='เบอร์โทรศัพท์' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='ชื่อผู้ใช้งาน' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='รหัสผ่าน' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='ยืนยันรหัสผ่าน' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='เลขที่' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='ตำบล' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='อำเภอ' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='จังหวัด' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='รหัสไปรษณีย์' keyboardType='default' style={styles.input}></TextInput>
                <View style={styles.buttonContainer}>
                    <PrimaryButton bgcolor={Colors.primary} title={"ลงทะเบียน"}
                        fontcolor={"black"}
                        onPress={() => { console.log("pressed"); }}
                    ></PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <CancelButton title={"ยกเลิก"} fontcolor={"black"} onPress={cancelHander} ></CancelButton>
                </View>
            </ScrollView>
        </View>
    )
}

export default RegisterSreen

const styles = StyleSheet.create({
    contianerRoot: {
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
    buttonContainer: {
        marginVertical: 5,
    }
})