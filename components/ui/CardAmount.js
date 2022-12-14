import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Textstyles from '../../constants/Textstyles'

const CardAmount = ({title,color,value ,fontColor}) => {
    return (
        <View style={[styles.cardBody,{backgroundColor:color}]}>
            <Text style={[styles.cardTitle,{color:fontColor}]}>{title}</Text>
            <Text style={[styles.cardTextAmount,{color:fontColor}]}>{value}</Text>
        </View>
    )
}

export default CardAmount

const styles = StyleSheet.create({
    cardBody: {
        borderRadius: 5,
        height: 152,
        width: 155,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: Textstyles.fontMainMedium,
        color: "white",
        textAlign: "center",
    },
    cardTextAmount: {
        fontSize: 32,
        fontFamily: Textstyles.fontMainBold,
        color: "white",
    }
})