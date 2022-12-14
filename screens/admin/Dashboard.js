import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardAmount from '../../components/ui/CardAmount'
import Colors from '../../constants/Colors'

const Dashboard = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={{flexGrow:1}}>
        <View style={styles.cardContainer}>
          <CardAmount color={Colors.secondary} title={"จำนวนสมาชิก"} fontColor={"white"} value={59}></CardAmount>
          <CardAmount color={Colors.primary} title={"ยอดรวมต่อเดือน"} fontColor={"black"} value={12341}></CardAmount>
        </View >
      </View>
      <View style={{flexGrow:2}}>
        <View style={styles.containerChart}>
          <View style={styles.bodyChart}>

            <Text>Chart</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 15,
    // alignContent:'flex-start'
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
    // alignItems:"center",
  },
  containerChart: {
    flex: 1,
    flexDirection: "column"
  },
  bodyChart: {
    backgroundColor: Colors.primary,
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  }

})