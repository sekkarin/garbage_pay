import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyData = ({message}) => {
  return (
    <View style={styles.containerRoot}>
      <Text>{message}</Text>
    </View>
  )
}

export default EmptyData

const styles = StyleSheet.create({
    containerRoot:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:24,
    
        
    },
})