import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorOverlay = ({message,onConFirm}) => {
  return (
    <View style={styles.containerRoot}>
      <Text style={[styles.title,styles.text]}>oops! เกิดปัญหาขึ้น</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConFirm} title={"ตกลง"}></Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    containerRoot:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:24,
        backgroundColor:"white"
    },
    text:{
        textAlign:'center',
        marginBottom:8,
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    
})