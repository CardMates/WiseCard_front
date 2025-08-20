import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyCardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cards</Text>
      <Text style={styles.subtitle}>Manage your cards here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
