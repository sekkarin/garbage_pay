import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryButton from '../../components/ui/PrimaryButton'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigator = useNavigation()
    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/car_garbage.png')}></Image>
                <View style={styles.bodyTextContainer}>
                    <Text style={{fontSize:36,
                    fontWeight:"bold",color:'#464646'}}>จ่ายค่าขยะออนไลน์</Text>
                    <Text style={{fontSize:24,fontWeight:'400'}}>เทศบาลหนองตากยา</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.bodyButton}>
                    <PrimaryButton bgcolor={Colors.primary}
                        fontcolor={"#424242"}
                        title={"เข้าสู่ระบบ"}
                        onPress={() => {
                            navigator.navigate("LoginScreen")
                        }}
                    ></PrimaryButton>
                </View>
                <View style={styles.bodyButton}>
                    <PrimaryButton bgcolor={"#DBDBDB"}
                        fontcolor={"#424242"}
                        title={"ลงทะเบียน"}
                        onPress={() => {
                            navigator.navigate("RegisterScreen")
                        }}
                    ></PrimaryButton>
                </View>
            </View>
        </View>
    )
}

export default WelcomeScreen

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
        flexGrow:1,    
        justifyContent:'center',
        padding:20
    },
    bodyButton: {
        marginVertical: 5,
    },
    imageContainer:{
        flexGrow:2,
        justifyContent:'center',
        alignItems:'center'
    },
    bodyTextContainer:{
        width:"100%",
        marginLeft:"20%"
    }
})