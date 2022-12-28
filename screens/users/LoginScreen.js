import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import PrimaryButton from '../../components/ui/PrimaryButton'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigator = useNavigation()
    const loginHander = () => {
        navigator.navigate("WelcomeScreen")
    }
    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/car_garbage.png')}></Image>

                <TextInput placeholder='อีเมล์' keyboardType='default' style={styles.input}></TextInput>
                <TextInput placeholder='รหัสผ่าน' keyboardType='default' style={styles.input}></TextInput>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.bodyButton}>
                    <PrimaryButton bgcolor={Colors.primary}
                        fontcolor={"#424242"}
                        title={"เข้าสู่ระบบ"}
                        onPress={loginHander}
                    ></PrimaryButton>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 308,
        height: 176
    },
    bodyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    bodyButton: {
        marginVertical: 5,
    },
    imageContainer: {
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        width: "80%",
        marginVertical: 15
    },
})