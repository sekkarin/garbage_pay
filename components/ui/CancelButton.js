import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Textstyles from '../../constants/Textstyles'

const CancelButton = ({title,fontcolor,onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.bodyButton}>
            <Text style={[styles.button, { color: fontcolor }]}>{title}</Text>
        </Pressable>
    )
}

export default CancelButton

const styles = StyleSheet.create({
    bodyButton: {
        backgroundColor:'#F9F9F9',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth:0.5,
        borderColor:"black"
    },
    button: {
        padding: 10,
        textAlign: 'center',
        fontSize: 24,
        fontFamily:Textstyles.fontMainBold
    }
})