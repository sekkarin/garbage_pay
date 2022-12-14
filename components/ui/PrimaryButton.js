import { StyleSheet, Text, View ,Pressable} from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Textstyles from '../../constants/Textstyles'


const PrimaryButton = ({title,fontcolor,bgcolor,onPress}) => {
    
    return (
        <Pressable onPress={onPress} style={[styles.bodyButton,{backgroundColor:bgcolor}]}>
            <Text style={[styles.button,{color:fontcolor}]}>{title}</Text>
        </Pressable>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    bodyButton: {
    
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 10,

    },
    button: {
        
        padding: 10,
        textAlign: 'center',
        fontSize: 24,
        fontFamily:Textstyles.fontMainBold
        
    }
})