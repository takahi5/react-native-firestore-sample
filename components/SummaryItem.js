import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    height: 64,
    margin: 16,
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 24,
    fontWeight: '600',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 12,
    marginLeft: 8,
  },
});

export default (SummaryItem = ({ cal, protein, lipid, carbohydrate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${cal}kcal`}</Text>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{`タンパク質: ${protein}g`}</Text>
        <Text style={styles.text}>{`脂質: ${lipid}g`}</Text>
        <Text style={styles.text}>{`炭水化物: ${carbohydrate}g`}</Text>
      </View>
    </View>
  );
});
