import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: 'カレンダー',
      headerLeft: (
        <Button onPress={() => navigation.goBack()} title="キャンセル" />
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
        <Calendar onDayPress={day => this.onDayPress(day)} />
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
