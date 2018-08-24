import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { FormLabel, FormInput, Icon } from 'react-native-elements';
import Fire from '../utils/Fire';
import Colors from '../constants/Colors';
import moment from 'moment';
import 'moment/locale/ja';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footerContainer: {
    margin: 16,
    alignItems: 'flex-end',
  },
});

export default class EditorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: params.date,
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
    const params = this.props.navigation.state.params || {};
    this.props.navigation.setParams({
      onPressOk: () => {
        this.onPressOk();
      },
    });
    if (params.date) {
      this.setState({ date: params.date });
    }
    if (params.id) {
      const food = await Fire.shared.getFoodById(params.id);
      this.setState({
        name: food.name,
        cal: food.cal,
        protein: food.protein,
        lipid: food.lipid,
        carbohydrate: food.carbohydrate,
        date: food.date,
      });
    }
  }

  async onPressOk() {
    const params = this.props.navigation.state.params || {};
    const { name, cal, protein, lipid, carbohydrate, date } = this.state;
    const food = {
      id: params.id,
      name,
      cal,
      protein,
      lipid,
      carbohydrate,
      date,
    };
    if (params.id) {
      await Fire.shared.updateFood(food);
    } else {
      await Fire.shared.createFood(food);
    }
    this.props.navigation.state.params.onEdited();
    this.props.navigation.goBack();
  }

  async onPressDelete() {
    const params = this.props.navigation.state.params || {};
    if (!params.id) return;

    Alert.alert('削除', 'このデータを削除します', [
      {
        text: 'OK',
        onPress: async () => {
          await Fire.shared.deleteFoodById(params.id);
          this.props.navigation.state.params.onEdited();
          this.props.navigation.goBack();
        },
        style: 'default',
      },
      { text: 'キャンセル', style: 'cancel' },
    ]);
  }

  render() {
    const params = this.props.navigation.state.params || {};
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
        {params.id ? (
          <View style={styles.footerContainer}>
            <Icon
              onPress={() => this.onPressDelete()}
              name="delete"
              color={Colors.primaryColor}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
