
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import BadgeList from '../../components/BadgeList';
import MilestoneList from '../../components/MilestoneList';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const ProgressScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Sample progress data
  const overallProgress = 65;
  const skillProgress = 80;
  const courseProgress = 45;
  const goalProgress = 70;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Track your career development journey
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{overallProgress}%</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Overall Progress</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.secondary }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Skills Learned</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.accent }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Courses Completed</Text>
        </View>
      </View>

      <ProgressBar 
        progress={overallProgress} 
        total={100} 
        label="Overall Career Progress" 
        color={colors.primary}
      />
      
      <ProgressBar 
        progress={skillProgress} 
        total={100} 
        label="Skill Development" 
        color={colors.secondary}
      />
      
      <ProgressBar 
        progress={courseProgress} 
        total={100} 
        label="Course Completion" 
        color={colors.accent}
      />
      
      <ProgressBar 
        progress={goalProgress} 
        total={100} 
        label="Goal Achievement" 
        color={colors.success}
      />

      <BadgeList 
        badges={[
          { id: 1, name: "First Steps", description: "Complete your profile", earned: true },
          { id: 2, name: "Explorer", description: "Try 5 different features", earned: true },
          { id: 3, name: "Learner", description: "Complete first course", earned: true },
          { id: 4, name: "Achiever", description: "Complete 10 tasks", earned: false },
          { id: 5, name: "Expert", description: "Master all skills", earned: false },
          { id: 6, name: "Mentor", description: "Help other users", earned: false },
        ]}
        title="Achievements"
      />

      <MilestoneList 
        milestones={[
          { id: 1, title: "Profile Setup", description: "Complete your profile information", completed: true, date: "2024-01-15" },
          { id: 2, title: "First Assessment", description: "Take your first career assessment", completed: true, date: "2024-01-20" },
          { id: 3, title: "Skill Development", description: "Complete 5 skill modules", completed: true, date: "2024-02-01" },
          { id: 4, title: "Course Completion", description: "Finish your first course", completed: true, date: "2024-02-15" },
          { id: 5, title: "Career Path Selection", description: "Choose your primary career path", completed: false, date: null },
          { id: 6, title: "Portfolio Building", description: "Create your professional portfolio", completed: false, date: null },
          { id: 7, title: "Networking", description: "Connect with 10 professionals", completed: false, date: null },
        ]}
        title="Career Milestones"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    ...Typography.h2,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default ProgressScreen;
