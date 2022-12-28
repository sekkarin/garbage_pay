import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'


const LoadingOverlay = () => {
  return (
    <View style={styles.containerRoot}>
      <ActivityIndicator size="large" color="black" ></ActivityIndicator>
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    containerRoot:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:24,
        backgroundColor:"white"
    }
})