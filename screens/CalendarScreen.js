import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: 'カレンダー',
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          name="close"
          color={Colors.primaryColor}
          containerStyle={{ marginLeft: 8 }}
        />
      ),
    };
  };

  onDayPress(day) {
    this.props.navigation.state.params.onDaySelected(day);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={day => this.onDayPress(day)}
          theme={{
            todayTextColor: Colors.tintColor,
            arrowColor: Colors.tintColor,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
