
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const ProgressBar = ({ 
  progress = 0, 
  total = 100, 
  label = "Progress", 
  showPercentage = true,
  color 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const progressColor = color || colors.primary;
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {showPercentage && (
          <Text style={[styles.percentage, { color: colors.primary }]}>
            {Math.round(percentage)}%
          </Text>
        )}
      </View>
      
      <View style={[styles.progressContainer, { backgroundColor: colors.surface }]}>
        <View 
          style={[
            styles.progressBar, 
            { 
              backgroundColor: progressColor,
              width: `${percentage}%`
            }
          ]} 
        />
      </View>
      
      <View style={styles.stats}>
        <Text style={[styles.statText, { color: colors.icon }]}>
          {progress} of {total} completed
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.h4,
  },
  percentage: {
    ...Typography.h4,
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 8,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  stats: {
    alignItems: 'center',
  },
  statText: {
    ...Typography.caption,
  },
});

export default ProgressBar;
