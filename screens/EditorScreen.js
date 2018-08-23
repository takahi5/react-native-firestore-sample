import React from 'react';
import { StyleSheet, View, Text, Button as RNButton } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Fire from '../utils/Fire';
import Colors from '../constants/Colors';
import firebase from 'firebase';
import moment from 'moment';
import 'moment/locale/ja';

export default class EditorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: '登録',
      headerLeft: (
        <RNButton onPress={() => navigation.goBack()} title="キャンセル" />
      ),
    };
  };

  state = {
    name: '',
    cal: 0,
    protein: 0,
    lipid: 0,
    carbohydrate: 0,
    date: moment().format('YYYY-MM-DD'),
  };

  async componentDidMount() {}

  openCalendar() {
    this.props.navigation.navigate('Calendar', {
      onDaySelected: day => {
        this.setState({ date: day.dateString });
      },
    });
  }

  async createFood() {
    const { name, cal, protein, lipid, carbohydrate, date } = this.state;
    const food = {
      name,
      cal,
      protein,
      lipid,
      carbohydrate,
      date,
    };
    await Fire.shared.createFood(food);
    this.props.navigation.state.params.onFoodAdded(food);
    this.props.navigation.goBack();
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
