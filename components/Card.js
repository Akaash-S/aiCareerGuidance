
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const Card = ({ 
  title, 
  subtitle, 
  data = [], 
  onPress, 
  style,
  children 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const CardContent = () => (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.icon }]}>{subtitle}</Text>
      )}
      {data.length > 0 && (
        <View style={styles.dataContainer}>
          {data.slice(0, 3).map((item, index) => (
            <View key={index} style={[styles.dataItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.dataText, { color: colors.text }]}>
                {typeof item === 'string' ? item : item.title || item.name}
              </Text>
            </View>
          ))}
          {data.length > 3 && (
            <Text style={[styles.moreText, { color: colors.primary }]}>
              +{data.length - 3} more
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  title: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.caption,
    marginBottom: Spacing.md,
    opacity: 0.8,
  },
  dataContainer: {
    marginTop: Spacing.sm,
  },
  dataItem: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  dataText: {
    ...Typography.body,
    fontSize: 14,
  },
  moreText: {
    ...Typography.caption,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
});

export default Card;
