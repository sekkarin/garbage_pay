import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Textstyles from '../../constants/Textstyles'
import PrimaryButton from '../../components/ui/PrimaryButton'
import Colors from '../../constants/Colors'
import CancelButton from '../../components/ui/CancelButton'

const AddBillScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>ออกค่าชำระขยะ</Text>
      <View style={{ flexGrow: 2 }}>

        <TextInput placeholder='จำนวนเงิน' keyboardType='number-pad' style={styles.input}></TextInput>
        <TextInput placeholder='คำอธิบาย' keyboardType='default' style={styles.input}></TextInput>
      </View>
      <View style={{ flexGrow: 0,paddingVertical:15 }}>
        <View style={styles.buttonContainer}>

          <PrimaryButton bgcolor={Colors.primary} title={"ออกค่าชำระ"}
            fontcolor={"black"}
            onPress={() => { console.log("pressed"); }}
          ></PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <CancelButton title={"ยกเลิก"} fontcolor={"black"} onPress={() => {
            console.log('====================================');
            console.log("pressed");
            console.log('====================================');
          }} ></CancelButton>
        </View>
      </View>
    </View>
  )
}

export default AddBillScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,

  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5
  },
  title: {
    fontFamily: Textstyles.fontMainBold,
    fontSize: Textstyles.fontTitle,
    color: "black",
    marginHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    padding: 10

  },
  bodytitle: {
    marginHorizontal: 10
  },
  buttonContainer: {
    marginVertical: 5,
    // marginHorizontal
  }
})