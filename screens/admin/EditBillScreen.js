import { StyleSheet, Text, View, TextInput, Alert, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Textstyles from '../../constants/Textstyles'
import PrimaryButton from '../../components/ui/PrimaryButton'
import Colors from '../../constants/Colors'
import CancelButton from '../../components/ui/CancelButton'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import SelectStatus from '../../components/ui/SelectStatus'

const EditBillScreen = ({ navigation, route }) => {
  const idInv = route.params.id
  let [invoice, setInvoice] = useState([])
  const [_amount, setAmount] = useState('')
  const [_desc, setDesc] = useState('')
  const [isFetch, setIsFecth] = useState(true)
  const [error, setError] = useState()
  // ปัญหา state ไม่อัพตาม
  let [_status, setStatus] = useState(null);

  const handleChangeValue = (e) => {

    setStatus(_status = e.value)
    // console.log(valueStatus);

  }
  const deleteInvoiceHander = async () => {
    setIsFecth(true)
    await fetch("http://10.0.2.2:8080/admin/invoices/" + idInv, {
      method: "DELETE",
    }).then(result => {
      setInvoice(false)
      Alert.alert("ลบสำเร็จ")
    }).then(() => {
      navigation.navigate("BillScrenn")
    }).catch(err => {
      Alert.alert("ลบไม่สำเร็จ")
    })
  }
  const deleteHander = async () => {
    const date = new Date(invoice.date)
    const result = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    Alert.alert(
      "ยืนยันที่จะลบ",
      `วันที่ : ${result} `,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: deleteInvoiceHander }
      ])
  }

  const upDateBillHander = async () => {
    // console.log(_amount, _desc, invoice.status);
    try {
      const data = {
        amount: _amount || invoice.amount,
        description: _desc || invoice.description,
        status: _status != null ? _status : invoice.status
      }
      const amountIsValid = !isNaN(data.amount) && data.amount > 0 
      const descriptionIsValid = data.description.trim().length > 0
      const statusIsValid = data.status === null
      if (!amountIsValid || !descriptionIsValid || statusIsValid) {
        Alert.alert("ป้อนข้อมูลไม่ถูกต้อง ")
        return
      }
      
      // console.log(data);
      await fetch("http://10.0.2.2:8080/admin/invoices/" + idInv, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(result => {
        Alert.alert("update succesed")
      }).catch(err => {
        Alert.alert("update not succsed")
      })


    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลจาก Server ได้")

    }
  }

  useEffect(() => {
    const data = []
    async function getinvoce() {
      try {
        setIsFecth(true)
        const res = await fetch("http://10.0.2.2:8080/admin/invoices/" + idInv, {
          method: "GET"
        })
        const _invoice = await res.json()

        const _dataobject = {
          id: _invoice.invoice._id,
          amount: _invoice.invoice.amount,
          description: _invoice.invoice.description,
          date: _invoice.invoice.createdAt,
          status: _invoice.invoice.status,

        }

        data.push(_dataobject)
        invoice = []
        setInvoice(...data)
        setIsFecth(false)
      } catch (err) {
        console.log(err);
      }
    }
    getinvoce()

    const focusHandler = navigation.addListener('focus', () => {
      getinvoce()
      // getBill()
    });
    return focusHandler;
    // data = dataBill
  }, [navigation])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={deleteHander}>
          <Icon name="trash-outline" size={30} color="#900" />
        </Pressable>
      ),
    });
  }, [invoice])


  if (error && !isFetch) {
    return <ErrorOverlay message={error} onConFirm={errorHandler}></ErrorOverlay>
  }
  if (isFetch) {
    return <LoadingOverlay></LoadingOverlay>
  }
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>แก้ใขรายการ</Text>

      <View style={{ flexGrow: 2 }}>

        <TextInput onChangeText={text => setAmount(text)}
          placeholder={invoice.amount}
          keyboardType='number-pad'
          style={styles.input}></TextInput>
        <TextInput onChangeText={text => setDesc(text)}
          placeholder={invoice.description}
          keyboardType='default'
          style={[styles.input, styles.textMultiLine]}
        // multiline={true}
        ></TextInput>
        <SelectStatus onChange={handleChangeValue} valueDefualt={invoice.status}></SelectStatus>
      </View>
      <View style={{ flexGrow: 0, paddingVertical: 15 }}>
        <View style={styles.buttonContainer}>

          <PrimaryButton bgcolor={Colors.primary} title={"ตกลง"}
            fontcolor={"black"}
            onPress={upDateBillHander}
          ></PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <CancelButton title={"ยกเลิก"} fontcolor={"black"} onPress={() => {
            navigation.goBack()
          }} ></CancelButton>
        </View>
      </View>
    </View>
  )
}

export default EditBillScreen

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
  },
  textMultiLine: {
    height: 150,
    textAlignVertical: 'top'
  }
})