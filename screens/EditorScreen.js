import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormLabel, FormInput, Icon } from 'react-native-elements';
import Fire from '../utils/Fire';
import Colors from '../constants/Colors';
import moment from 'moment';
import 'moment/locale/ja';

export default class EditorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: '登録',
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          name="close"
          color={Colors.primaryColor}
          containerStyle={{ marginLeft: 8 }}
        />
      ),
      headerRight: (
        <Icon
          onPress={() => params.onPressOk()}
          name="check"
          color={Colors.primaryColor}
          containerStyle={{ marginLeft: 8 }}
          containerStyle={{ marginRight: 8 }}
        />
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

  async componentDidMount() {
    this.props.navigation.setParams({
      onPressOk: () => {
        this.createFood();
      },
    });
    if (this.props.navigation.state.params.date) {
      this.setState({ date: this.props.navigation.state.params.date });
    }
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
