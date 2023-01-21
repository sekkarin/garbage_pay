/* eslint-disable react/self-closing-comp */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { ListItem } from '@rneui/themed';
const Profile = () => {
  // const fetchDataUser = async () => {
  //   const response = fetch("",
  //     {}
  //   )
  // }

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{ marginVertical: 20 }}
        // avatarStyle={styles.avatar}
        size={200}
        rounded
        source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
      />
      <Text>Profile</Text>
      <View style={{ width: "100%", padding: 10 }}>
        <ListItem >
          <Icon name="inbox" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>234242424</ListItem.Title>
          </ListItem.Content>
          {/* <ListItem.Chevron /> */}
        </ListItem>
        <ListItem>
          <Icon name="trash-can-outline" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Trash</ListItem.Title>
          </ListItem.Content>
          {/* <ListItem.Chevron /> */}
        </ListItem>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  avatar: {
    width: 300,
    height: 300,
  },
});
