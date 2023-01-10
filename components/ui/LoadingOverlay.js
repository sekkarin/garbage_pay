import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingOverlay = ({message = ''}) => {
  return (
    <View style={styles.containerRoot}>
      <ActivityIndicator size="large" color="black" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  text: {
    paddingVertical: 10,
    fontSize: 18,
    color: '#6D6868',
    textAlign: 'center',
  },
});
