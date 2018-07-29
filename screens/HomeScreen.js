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
        <FormInput onChangeText={text => console.log(text)} />
        <FormLabel>カロリー(kcal)</FormLabel>
        <FormInput
          onChangeText={text => console.log(text)}
          keyboardType={"number-pad"}
        />
        <FormLabel>タンパク質(g)</FormLabel>
        <FormInput
          onChangeText={text => console.log(text)}
          keyboardType={"number-pad"}
        />
        <FormLabel>脂質(g)</FormLabel>
        <FormInput
          onChangeText={text => console.log(text)}
          keyboardType={"number-pad"}
        />
        <FormLabel>炭水化物(g)</FormLabel>
        <FormInput
          onChangeText={text => console.log(text)}
          keyboardType={"number-pad"}
        />
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
