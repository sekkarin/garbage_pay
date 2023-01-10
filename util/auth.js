const {Alert} = require('react-native');

exports.createUser = async ({...user}) => {
  try {
    console.log(typeof user);
    console.log(user);
    await fetch('http://10.0.2.2:8080/auth/signup', {
      method: 'PUT',
      body: JSON.stringify(...user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    Alert.alert('ไม่สามารถลงทะเบียนได้');
  }
};
