import React from "react";
import { StyleSheet, View } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import Fire from "../utils/Fire";
import firebase from "firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    name: "",
    cal: 0,
    protein: 0,
    lipid: 0,
    carbohydrate: 0,
    date: "2018-07-01"
  };

  async componentDidMount() {
    // Check if we are signed in...
    if (Fire.shared.uid) {
      // If we are, then we can get the first 5 posts
      const res = await Fire.shared.getFoods();
      console.log(res);
    } else {
      // If we aren't then we should just start observing changes. This will be called when the user signs in
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          const res = await Fire.shared.getFoods();
          console.log(res);
        }
      });
    }
  }

  createFood() {
    const { name, cal, protein, lipid, carbohydrate, date } = this.state;
    Fire.shared.createFood({
      name,
      cal,
      protein,
      lipid,
      carbohydrate,
      date
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>名前</FormLabel>
        <FormInput
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <FormLabel>カロリー(kcal)</FormLabel>
        <FormInput
          onChangeText={cal => this.setState({ cal: Number(cal) })}
          keyboardType={"number-pad"}
          value={this.state.cal.toString()}
        />
        <FormLabel>タンパク質(g)</FormLabel>
        <FormInput
          onChangeText={protein => this.setState({ protein: Number(protein) })}
          keyboardType={"number-pad"}
          value={this.state.protein.toString()}
        />
        <FormLabel>脂質(g)</FormLabel>
        <FormInput
          onChangeText={lipid => this.setState({ lipid: Number(lipid) })}
          keyboardType={"number-pad"}
          value={this.state.lipid.toString()}
        />
        <FormLabel>炭水化物(g)</FormLabel>
        <FormInput
          onChangeText={carbohydrate =>
            this.setState({ carbohydrate: Number(carbohydrate) })
          }
          keyboardType={"number-pad"}
          value={this.state.carbohydrate.toString()}
        />
        <Button title="登録" onPress={() => this.createFood()} />
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
