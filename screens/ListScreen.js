import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Fire from '../utils/Fire';
import Colors from '../constants/Colors';
import firebase from 'firebase';
import moment from 'moment';
import 'moment/locale/ja';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'FOOD NOTE',
  };

  state = {
    foods: [],
    date: moment().format('YYYY-MM-DD'),
  };

  async componentDidMount() {
    if (Fire.shared.uid) {
      this.searchFooodByDay(this.state.date);
    } else {
      firebase.auth().onAuthStateChanged(async user => {
        this.searchFooodByDay(this.state.date);
      });
    }
  }

  async onDaySelected(day) {
    this.setState({ date: day.dateString });
    this.searchFooodByDay(day.dateString);
  }

  async searchFooodByDay(dateString) {
    const foods = await Fire.shared.searchFooodByDay(dateString);
    this.setState({ foods });
  }

  openCalendar() {
    this.props.navigation.navigate('Calendar', {
      onDaySelected: day => this.onDaySelected(day),
    });
  }

  openEditor() {
    this.props.navigation.navigate('Editor');
  }

  renderFood(food) {
    return (
      <View>
        <Text>{food.name}</Text>
      </View>
    );
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
          backgroundColor={Colors.buttonBackground}
          rounded
        />
        <FlatList
          data={this.state.foods}
          renderItem={({ item }) => this.renderFood(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="ADD"
          onPress={() => this.openEditor()}
          color={Colors.buttonText}
          icon={{
            name: 'calendar',
            type: 'font-awesome',
            color: Colors.buttonText,
          }}
          backgroundColor="transparent"
        />
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
