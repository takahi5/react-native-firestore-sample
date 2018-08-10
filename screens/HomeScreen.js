import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Fire from '../utils/Fire';
import Colors from '../constants/Colors';
import firebase from 'firebase';
import moment from 'moment';
import 'moment/locale/ja';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    name: '',
    cal: 0,
    protein: 0,
    lipid: 0,
    carbohydrate: 0,
    date: moment().format('YYYY-MM-DD'),
  };

  async componentDidMount() {
    // Check if we are signed in...
    if (Fire.shared.uid) {
      // If we are, then we can get the first 5 posts
    } else {
      // If we aren't then we should just start observing changes. This will be called when the user signs in
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
        }
      });
    }
  }

  openCalendar() {
    this.props.navigation.navigate('Calendar', {
      onDaySelected: day => {
        this.setState({ date: day.dateString });
      },
    });
  }

  createFood() {
    const { name, cal, protein, lipid, carbohydrate, date } = this.state;
    Fire.shared.createFood({
      name,
      cal,
      protein,
      lipid,
      carbohydrate,
      date,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={this.state.date}
          onPress={() => this.openCalendar()}
          color={Colors.buttonText}
          icon={{
            name: 'calendar',
            type: 'font-awesome',
            color: Colors.buttonText,
          }}
          backgroundColor="transparent"
        />
        <FormLabel>名前</FormLabel>
        <FormInput
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <FormLabel>カロリー(kcal)</FormLabel>
        <FormInput
          onChangeText={cal => this.setState({ cal: Number(cal) })}
          keyboardType={'number-pad'}
          value={this.state.cal.toString()}
        />
        <FormLabel>タンパク質(g)</FormLabel>
        <FormInput
          onChangeText={protein => this.setState({ protein: Number(protein) })}
          keyboardType={'number-pad'}
          value={this.state.protein.toString()}
        />
        <FormLabel>脂質(g)</FormLabel>
        <FormInput
          onChangeText={lipid => this.setState({ lipid: Number(lipid) })}
          keyboardType={'number-pad'}
          value={this.state.lipid.toString()}
        />
        <FormLabel>炭水化物(g)</FormLabel>
        <FormInput
          onChangeText={carbohydrate =>
            this.setState({ carbohydrate: Number(carbohydrate) })
          }
          keyboardType={'number-pad'}
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
    backgroundColor: '#fff',
  },
});
