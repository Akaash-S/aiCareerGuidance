
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const Greeting = ({ text = "Hello, User!" }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.greeting, { color: colors.text }]}>
        {text}
      </Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>
        Welcome to your AI Career Mentor
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    opacity: 0.8,
  },
});

export default Greeting;
