import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  subTitle: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 10,
    marginLeft: 8,
  },
});

export default (ListItem = ({ food }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.subTitle}>{`${food.cal}kcal`}</Text>
      </View>
      <View style={[styles.subContainer, { justifyContent: 'flex-end' }]}>
        <Text style={styles.text}>{`タンパク質: ${food.protein}g`}</Text>
        <Text style={styles.text}>{`脂質: ${food.lipid}g`}</Text>
        <Text style={styles.text}>{`炭水化物: ${food.carbohydrate}g`}</Text>
      </View>
    </View>
  );
});
