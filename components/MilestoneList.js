
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const MilestoneList = ({ 
  milestones = [
    { id: 1, title: "Profile Setup", description: "Complete your profile information", completed: true, date: "2024-01-15" },
    { id: 2, title: "First Assessment", description: "Take your first career assessment", completed: true, date: "2024-01-20" },
    { id: 3, title: "Skill Development", description: "Complete 5 skill modules", completed: false, date: null },
    { id: 4, title: "Career Path Selection", description: "Choose your primary career path", completed: false, date: null },
  ],
  title = "Milestones"
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const completedMilestones = milestones.filter(milestone => milestone.completed);
  const upcomingMilestones = milestones.filter(milestone => !milestone.completed);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.icon }]}>
        {completedMilestones.length} of {milestones.length} milestones completed
      </Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {milestones.map((milestone, index) => (
          <View key={milestone.id} style={styles.milestoneItem}>
            <View style={styles.milestoneContent}>
              <View style={[
                styles.milestoneIcon,
                { 
                  backgroundColor: milestone.completed ? colors.success : colors.surface,
                  borderColor: milestone.completed ? colors.success : colors.border
                }
              ]}>
                <Text style={[
                  styles.milestoneEmoji,
                  { color: milestone.completed ? colors.card : colors.icon }
                ]}>
                  {milestone.completed ? '✓' : '○'}
                </Text>
              </View>
              
              <View style={styles.milestoneText}>
                <Text style={[
                  styles.milestoneTitle,
                  { 
                    color: milestone.completed ? colors.text : colors.icon,
                    textDecorationLine: milestone.completed ? 'line-through' : 'none'
                  }
                ]}>
                  {milestone.title}
                </Text>
                <Text style={[
                  styles.milestoneDescription,
                  { color: colors.icon }
                ]}>
                  {milestone.description}
                </Text>
                {milestone.completed && milestone.date && (
                  <Text style={[
                    styles.milestoneDate,
                    { color: colors.success }
                  ]}>
                    Completed on {new Date(milestone.date).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
            
            {index < milestones.length - 1 && (
              <View style={[
                styles.connector,
                { 
                  backgroundColor: milestone.completed ? colors.success : colors.border
                }
              ]} />
            )}
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
    maxHeight: 300,
  },
  title: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.caption,
    marginBottom: Spacing.md,
  },
  milestoneItem: {
    position: 'relative',
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  milestoneIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    zIndex: 1,
  },
  milestoneEmoji: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  milestoneText: {
    flex: 1,
    paddingTop: 2,
  },
  milestoneTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  milestoneDescription: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  milestoneDate: {
    ...Typography.small,
    fontWeight: '600',
  },
  connector: {
    position: 'absolute',
    left: 15,
    top: 32,
    width: 2,
    height: 20,
  },
});

export default MilestoneList;
