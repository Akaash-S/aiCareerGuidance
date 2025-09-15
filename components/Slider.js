
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slider = ({ pages }) => {
  return (
    <View style={styles.container}>
      <Text>Slider Component with {pages} pages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Slider;
