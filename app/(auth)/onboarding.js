
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Animated 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const { width: screenWidth } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const onboardingData = [
    {
      id: 1,
      title: "Welcome to AI Career Mentor",
      subtitle: "Your personal career development assistant",
      description: "Discover your ideal career path with AI-powered insights and personalized recommendations.",
      icon: "🎯",
      color: colors.primary
    },
    {
      id: 2,
      title: "Personalized Learning",
      subtitle: "Tailored to your goals and interests",
      description: "Get customized course recommendations and skill development paths based on your profile.",
      icon: "📚",
      color: colors.secondary
    },
    {
      id: 3,
      title: "Track Your Progress",
      subtitle: "Monitor your career journey",
      description: "Visualize your achievements, track milestones, and celebrate your growth with our progress system.",
      icon: "📊",
      color: colors.accent
    }
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * screenWidth,
        animated: true
      });
    } else {
      router.replace('/profile-setup');
    }
  };

  const handleSkip = () => {
    router.replace('/profile-setup');
  };

  const handlePageChange = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentPage(page);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={[styles.skipText, { color: colors.icon }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageChange}
        style={styles.scrollView}
      >
        {onboardingData.map((page, index) => (
          <View key={page.id} style={styles.page}>
            <View style={styles.content}>
              <View style={[styles.iconContainer, { backgroundColor: page.color }]}>
                <Text style={styles.icon}>{page.icon}</Text>
              </View>
              
              <Text style={[styles.title, { color: colors.text }]}>{page.title}</Text>
              <Text style={[styles.subtitle, { color: colors.primary }]}>{page.subtitle}</Text>
              <Text style={[styles.description, { color: colors.icon }]}>{page.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentPage ? colors.primary : colors.border,
                  width: index === currentPage ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  skipButton: {
    padding: Spacing.sm,
  },
  skipText: {
    ...Typography.body,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.h4,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    ...Typography.body,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  nextButtonText: {
    ...Typography.h4,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default OnboardingScreen;
