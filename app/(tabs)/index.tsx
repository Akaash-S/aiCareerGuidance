import React, { useState, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Animated,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import Greeting from '../../components/Greeting';
import Card from '../../components/Card';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Enhanced sample data
  const userStats = {
    name: "Alex",
    streak: 7,
    totalHours: 42,
    completedCourses: 8,
    skillsLearned: 12,
    overallProgress: 65
  };

  const careerPaths: Array<{ 
    title: string; 
    description: string; 
    progress: number; 
    icon: string; 
    salary: string;
    demand: string;
  }> = [
    { 
      title: "Software Engineer", 
      description: "Full-stack development", 
      progress: 75, 
      icon: "💻",
      salary: "$95k-150k",
      demand: "High"
    },
    { 
      title: "Data Scientist", 
      description: "Machine learning & analytics", 
      progress: 60, 
      icon: "📊",
      salary: "$110k-180k",
      demand: "Very High"
    },
    { 
      title: "Product Manager", 
      description: "Product strategy & leadership", 
      progress: 40, 
      icon: "🎯",
      salary: "$100k-160k",
      demand: "High"
    },
  ];

  const courses: Array<{ 
    title: string; 
    instructor: string; 
    rating: number; 
    duration: string;
    progress: number;
    thumbnail: string;
  }> = [
    { 
      title: "React Native Masterclass", 
      instructor: "John Doe", 
      rating: 4.8, 
      duration: "12 hours",
      progress: 85,
      thumbnail: "📱"
    },
    { 
      title: "Python for Data Science", 
      instructor: "Jane Smith", 
      rating: 4.9, 
      duration: "16 hours",
      progress: 60,
      thumbnail: "🐍"
    },
    { 
      title: "UI/UX Design Fundamentals", 
      instructor: "Mike Johnson", 
      rating: 4.7, 
      duration: "8 hours",
      progress: 30,
      thumbnail: "🎨"
    },
  ];

  const skills: Array<{ 
    name: string; 
    level: string; 
    progress: number;
    category: string;
  }> = [
    { name: "JavaScript", level: "Advanced", progress: 85, category: "Programming" },
    { name: "React", level: "Intermediate", progress: 70, category: "Frontend" },
    { name: "Python", level: "Beginner", progress: 30, category: "Programming" },
    { name: "Design", level: "Intermediate", progress: 60, category: "Creative" },
  ];

  const quickActions = [
    { 
      title: "Take Assessment", 
      subtitle: "Discover your strengths",
      icon: "📝", 
      color: colors.primary, 
      onPress: () => console.log('Assessment'),
      gradient: [colors.primary, colors.primaryDark]
    },
    { 
      title: "Browse Courses", 
      subtitle: "Find new skills",
      icon: "📚", 
      color: colors.secondary, 
      onPress: () => router.push('/explore'),
      gradient: [colors.secondary, '#1976D2']
    },
    { 
      title: "View Progress", 
      subtitle: "Track achievements",
      icon: "📊", 
      color: colors.accent, 
      onPress: () => router.push('/progress'),
      gradient: [colors.accent, '#F57C00']
    },
    { 
      title: "Chat with AI", 
      subtitle: "Get personalized advice",
      icon: "🤖", 
      color: colors.success, 
      onPress: () => router.push('/chatbot'),
      gradient: [colors.success, '#388E3C']
    },
  ];

  const recentActivity = [
    { id: 1, action: "Completed", item: "React Native Basics", time: "2 hours ago", icon: "✅" },
    { id: 2, action: "Started", item: "Python Data Analysis", time: "1 day ago", icon: "🚀" },
    { id: 3, action: "Earned", item: "JavaScript Expert Badge", time: "3 days ago", icon: "🏆" },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Enhanced Header with User Stats */}
      <Animated.View 
        style={[
          styles.headerContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={[styles.headerCard, { backgroundColor: colors.primary }]}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Text style={styles.greetingText}>Good morning, {userStats.name}! 👋</Text>
              <Text style={styles.motivationText}>Ready to continue your learning journey?</Text>
            </View>
            <View style={styles.streakContainer}>
              <Text style={styles.streakNumber}>{userStats.streak}</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Quick Stats Overview */}
      <Animated.View 
        style={[
          styles.statsOverview,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.statsRow}>
          <View style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{userStats.totalHours}h</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Total Hours</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{userStats.completedCourses}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Courses Done</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{userStats.skillsLearned}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Skills Learned</Text>
          </View>
        </View>
      </Animated.View>

      {/* Enhanced Quick Actions */}
      <Animated.View 
        style={[
          styles.quickActionsContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={action.onPress}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                <Text style={styles.actionEmoji}>{action.icon}</Text>
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
              <Text style={[styles.actionSubtitle, { color: colors.icon }]}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Enhanced Career Paths Section */}
      <Animated.View 
        style={[
          styles.section,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended Career Paths</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {careerPaths.map((path, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.careerCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => console.log('View career path:', path.title)}
            >
              <View style={styles.careerHeader}>
                <Text style={styles.careerIcon}>{path.icon}</Text>
                <View style={styles.careerInfo}>
                  <Text style={[styles.careerTitle, { color: colors.text }]}>{path.title}</Text>
                  <Text style={[styles.careerDescription, { color: colors.icon }]}>{path.description}</Text>
                </View>
              </View>
              <View style={styles.careerStats}>
                <View style={styles.careerStat}>
                  <Text style={[styles.careerStatValue, { color: colors.primary }]}>{path.salary}</Text>
                  <Text style={[styles.careerStatLabel, { color: colors.icon }]}>Salary Range</Text>
                </View>
                <View style={styles.careerStat}>
                  <Text style={[styles.careerStatValue, { color: colors.success }]}>{path.demand}</Text>
                  <Text style={[styles.careerStatLabel, { color: colors.icon }]}>Demand</Text>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: colors.primary,
                        width: `${path.progress}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.text }]}>{path.progress}% Match</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Enhanced Courses Section */}
      <Animated.View 
        style={[
          styles.section,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Continue Learning</Text>
          <TouchableOpacity onPress={() => router.push('/explore')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.courseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => console.log('View course:', course.title)}
          >
            <View style={styles.courseHeader}>
              <Text style={styles.courseThumbnail}>{course.thumbnail}</Text>
              <View style={styles.courseInfo}>
                <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
                <Text style={[styles.courseInstructor, { color: colors.icon }]}>by {course.instructor}</Text>
                <View style={styles.courseMeta}>
                  <Text style={[styles.courseRating, { color: colors.accent }]}>⭐ {course.rating}</Text>
                  <Text style={[styles.courseDuration, { color: colors.icon }]}>{course.duration}</Text>
                </View>
              </View>
            </View>
            <View style={styles.courseProgress}>
              <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: colors.secondary,
                      width: `${course.progress}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: colors.text }]}>{course.progress}% Complete</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Recent Activity Section */}
      <Animated.View 
        style={[
          styles.section,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        <View style={[styles.activityContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {recentActivity.map((activity, index) => (
            <View key={activity.id} style={styles.activityItem}>
              <Text style={styles.activityIcon}>{activity.icon}</Text>
              <View style={styles.activityContent}>
                <Text style={[styles.activityText, { color: colors.text }]}>
                  <Text style={styles.activityAction}>{activity.action}</Text> {activity.item}
                </Text>
                <Text style={[styles.activityTime, { color: colors.icon }]}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header Styles
  headerContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  headerCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  greetingText: {
    ...Typography.h2,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  motivationText: {
    ...Typography.body,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    minWidth: 80,
  },
  streakNumber: {
    ...Typography.h1,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  streakLabel: {
    ...Typography.caption,
    color: '#FFFFFF',
    opacity: 0.9,
  },

  // Stats Overview
  statsOverview: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.sm,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.h4,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.small,
    textAlign: 'center',
    opacity: 0.8,
  },

  // Quick Actions
  quickActionsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  actionEmoji: {
    fontSize: 28,
  },
  actionTitle: {
    ...Typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  actionSubtitle: {
    ...Typography.small,
    textAlign: 'center',
    opacity: 0.8,
  },

  // Section Styles
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  seeAllText: {
    ...Typography.caption,
    fontWeight: '600',
  },

  // Career Paths
  horizontalScroll: {
    paddingLeft: Spacing.lg,
  },
  careerCard: {
    width: screenWidth * 0.7,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  careerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  careerIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  careerInfo: {
    flex: 1,
  },
  careerTitle: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  careerDescription: {
    ...Typography.caption,
    opacity: 0.8,
  },
  careerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  careerStat: {
    alignItems: 'center',
  },
  careerStatValue: {
    ...Typography.caption,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  careerStatLabel: {
    ...Typography.small,
    opacity: 0.8,
  },
  progressContainer: {
    marginTop: Spacing.sm,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    ...Typography.small,
    textAlign: 'center',
    fontWeight: '600',
  },

  // Courses
  courseCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  courseThumbnail: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  courseInstructor: {
    ...Typography.caption,
    opacity: 0.8,
    marginBottom: Spacing.sm,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseRating: {
    ...Typography.small,
    fontWeight: '600',
  },
  courseDuration: {
    ...Typography.small,
    opacity: 0.8,
  },
  courseProgress: {
    marginTop: Spacing.sm,
  },

  // Recent Activity
  activityContainer: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    ...Typography.body,
    marginBottom: Spacing.xs,
  },
  activityAction: {
    fontWeight: '600',
  },
  activityTime: {
    ...Typography.small,
    opacity: 0.8,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: Spacing.xxl,
  },
});

export default HomeScreen;
