import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { text } from 'express';

const AuthForm = ({ onSubmit, credentialsInvalid }) => {
    const [_fname, setFname] = useState('');
    const [_lname, setlname] = useState('');
    const [_email, setEmail] = useState('');
    const [_tell, setTell] = useState('');
    const [_password, setPassword] = useState('');
    const [_comfirmPassword, setComfirmPassword] = useState('');
    const [_houseOn, setHouseOn] = useState('');
    const [_village, SetVillage] = useState('');
    const [_subDistrict, setSubDistrict] = useState('');
    const [_district, setDistrict] = useState('');
    const [_province, setProvince] = useState('');
    const [_postalCode, setPostalCode] = useState('');
    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;
    return (
        <View>
            <TextInput
                placeholder="ชื่อ"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setFname(text)}></TextInput>
            <TextInput
                placeholder="นามสกุล"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setlname(text)}></TextInput>
            <TextInput
                placeholder="อีเมล์"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setEmail(text)}></TextInput>
            <TextInput
                placeholder="เบอร์โทรศัพท์"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setTell(text)}></TextInput>
            <TextInput
                placeholder="รหัสผ่าน"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setPassword(text)}></TextInput>
            <TextInput
                placeholder="ยืนยันรหัสผ่าน"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setComfirmPassword(text)}></TextInput>
            <TextInput
                placeholder="เลขที่"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setHouseOn(text)}></TextInput>
            <TextInput
                placeholder="หมู่บ้าน"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => SetVillage(text)}></TextInput>
            <TextInput
                placeholder="ตำบล"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setSubDistrict(text)}></TextInput>
            <TextInput
                placeholder="อำเภอ"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setDistrict(text)}></TextInput>
            <TextInput
                placeholder="จังหวัด"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setProvince(text)}></TextInput>
            <TextInput
                placeholder="รหัสไปรษณีย์"
                keyboardType="default"
                style={styles.input}
                onChangeText={text => setPostalCode(text)}></TextInput>
        </View>
    );
};

export default AuthForm;

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
    },
});
