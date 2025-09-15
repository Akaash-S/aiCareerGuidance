
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const BadgeList = ({ 
  badges = [
    { id: 1, name: "First Steps", description: "Complete your profile", earned: true },
    { id: 2, name: "Explorer", description: "Try 5 different features", earned: true },
    { id: 3, name: "Achiever", description: "Complete 10 tasks", earned: false },
    { id: 4, name: "Expert", description: "Master all skills", earned: false },
  ],
  title = "Achievements"
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>
        {earnedBadges.length} of {badges.length} badges earned
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
        {badges.map((badge) => (
          <View 
            key={badge.id} 
            style={[
              styles.badge,
              { 
                backgroundColor: badge.earned ? colors.primary : colors.surface,
                borderColor: badge.earned ? colors.primary : colors.border,
                opacity: badge.earned ? 1 : 0.6
              }
            ]}
          >
            <View style={[
              styles.badgeIcon,
              { backgroundColor: badge.earned ? colors.card : colors.border }
            ]}>
              <Text style={[
                styles.badgeEmoji,
                { color: badge.earned ? colors.primary : colors.icon }
              ]}>
                {badge.earned ? '🏆' : '🔒'}
              </Text>
            </View>
            <Text style={[
              styles.badgeName,
              { color: badge.earned ? colors.card : colors.text }
            ]}>
              {badge.name}
            </Text>
            <Text style={[
              styles.badgeDescription,
              { color: badge.earned ? colors.card : colors.icon }
            ]}>
              {badge.description}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  title: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.caption,
    marginBottom: Spacing.md,
  },
  badgeScroll: {
    marginHorizontal: -Spacing.sm,
  },
  badge: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    marginHorizontal: Spacing.sm,
    alignItems: 'center',
    minWidth: 120,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badgeEmoji: {
    fontSize: 20,
  },
  badgeName: {
    ...Typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  badgeDescription: {
    ...Typography.small,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default BadgeList;
