import React from "react";
import { StyleSheet, View } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>名前</FormLabel>
        <FormInput onChangeText={name => console.log(name)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
