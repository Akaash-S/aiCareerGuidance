import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const { width: screenWidth } = Dimensions.get('window');

const ExploreScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
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

  const categories = [
    { name: 'All', icon: '🌟', count: 156 },
    { name: 'Technology', icon: '💻', count: 45 },
    { name: 'Design', icon: '🎨', count: 32 },
    { name: 'Business', icon: '📈', count: 28 },
    { name: 'Science', icon: '🔬', count: 25 },
    { name: 'Arts', icon: '🎭', count: 26 }
  ];

  const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Rating', value: 'rating' },
    { label: 'Price', value: 'price' },
    { label: 'Duration', value: 'duration' },
    { label: 'Newest', value: 'newest' }
  ];

  const courses = [
    {
      id: 1,
      title: "Complete React Native Course",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12500,
      duration: "24 hours",
      price: 89,
      originalPrice: 149,
      category: "Technology",
      level: "Intermediate",
      image: "📱",
      isFeatured: true,
      isNew: false,
      description: "Master React Native from scratch and build professional mobile apps",
      tags: ["React", "Mobile", "JavaScript"],
      completionRate: 87,
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Mike Chen",
      rating: 4.8,
      students: 8900,
      duration: "18 hours",
      price: 79,
      originalPrice: 129,
      category: "Design",
      level: "Beginner",
      image: "🎨",
      isFeatured: true,
      isNew: true,
      description: "Learn modern UI/UX design principles and create stunning interfaces",
      tags: ["Design", "Figma", "Prototyping"],
      completionRate: 92,
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Dr. Emily Rodriguez",
      rating: 4.9,
      students: 15600,
      duration: "32 hours",
      price: 99,
      originalPrice: 199,
      category: "Science",
      level: "Intermediate",
      image: "🐍",
      isFeatured: false,
      isNew: false,
      description: "Comprehensive Python course for data analysis and machine learning",
      tags: ["Python", "Data Science", "ML"],
      completionRate: 85,
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "Alex Thompson",
      rating: 4.7,
      students: 9800,
      duration: "16 hours",
      price: 69,
      originalPrice: 99,
      category: "Business",
      level: "Beginner",
      image: "📈",
      isFeatured: false,
      isNew: false,
      description: "Learn effective digital marketing strategies for business growth",
      tags: ["Marketing", "SEO", "Social Media"],
      completionRate: 78,
      lastUpdated: "5 days ago"
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      instructor: "Prof. David Kim",
      rating: 4.8,
      students: 11200,
      duration: "28 hours",
      price: 119,
      originalPrice: 179,
      category: "Technology",
      level: "Advanced",
      image: "🤖",
      isFeatured: true,
      isNew: false,
      description: "Deep dive into machine learning algorithms and applications",
      tags: ["ML", "AI", "Python"],
      completionRate: 73,
      lastUpdated: "1 week ago"
    },
    {
      id: 6,
      title: "Creative Writing Workshop",
      instructor: "Lisa Martinez",
      rating: 4.6,
      students: 5400,
      duration: "12 hours",
      price: 49,
      originalPrice: 79,
      category: "Arts",
      level: "Beginner",
      image: "✍️",
      isFeatured: false,
      isNew: true,
      description: "Unlock your creative potential through structured writing exercises",
      tags: ["Writing", "Creative", "Storytelling"],
      completionRate: 89,
      lastUpdated: "4 days ago"
    },
    {
      id: 7,
      title: "Advanced JavaScript Patterns",
      instructor: "John Smith",
      rating: 4.9,
      students: 8700,
      duration: "20 hours",
      price: 89,
      originalPrice: 139,
      category: "Technology",
      level: "Advanced",
      image: "⚡",
      isFeatured: false,
      isNew: false,
      description: "Master advanced JavaScript concepts and design patterns",
      tags: ["JavaScript", "ES6+", "Patterns"],
      completionRate: 81,
      lastUpdated: "6 days ago"
    },
    {
      id: 8,
      title: "Financial Analysis & Modeling",
      instructor: "Dr. Maria Garcia",
      rating: 4.8,
      students: 6200,
      duration: "25 hours",
      price: 109,
      originalPrice: 159,
      category: "Business",
      level: "Intermediate",
      image: "💰",
      isFeatured: false,
      isNew: false,
      description: "Learn financial modeling and analysis for business decisions",
      tags: ["Finance", "Excel", "Modeling"],
      completionRate: 76,
      lastUpdated: "1 week ago"
    }
  ];

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'newest':
          return b.id - a.id;
        case 'popularity':
        default:
          return b.students - a.students;
      }
    });

  const featuredCourses = courses.filter(course => course.isFeatured);
  const newCourses = courses.filter(course => course.isNew);

  const renderCourse = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.courseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('View course:', item.title)}
      activeOpacity={0.8}
    >
      {/* Course Header with Badges */}
      <View style={styles.courseHeader}>
        <View style={styles.courseImageContainer}>
          <Text style={styles.courseImage}>{item.image}</Text>
          {item.isFeatured && (
            <View style={[styles.featuredBadge, { backgroundColor: colors.accent }]}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
          {item.isNew && (
            <View style={[styles.newBadge, { backgroundColor: colors.success }]}>
              <Text style={styles.newText}>New</Text>
            </View>
          )}
        </View>
        <View style={styles.courseInfo}>
          <Text style={[styles.courseTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.courseInstructor, { color: colors.icon }]}>by {item.instructor}</Text>
          <Text style={[styles.courseDescription, { color: colors.icon }]}>{item.description}</Text>
        </View>
        <View style={styles.coursePriceContainer}>
          <Text style={[styles.priceText, { color: colors.primary }]}>${item.price}</Text>
          {item.originalPrice > item.price && (
            <Text style={[styles.originalPrice, { color: colors.icon }]}>${item.originalPrice}</Text>
          )}
        </View>
      </View>
      
      {/* Course Stats */}
      <View style={styles.courseStats}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={[styles.statText, { color: colors.text }]}>{item.rating}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={[styles.statText, { color: colors.text }]}>{item.students.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={[styles.statText, { color: colors.text }]}>{item.duration}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>📊</Text>
          <Text style={[styles.statText, { color: colors.text }]}>{item.completionRate}%</Text>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.map((tag: string, index: number) => (
          <View key={index} style={[styles.tag, { backgroundColor: colors.surface }]}>
            <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
          </View>
        ))}
      </View>
      
      {/* Course Footer */}
      <View style={styles.courseFooter}>
        <View style={styles.footerLeft}>
          <View style={[styles.levelBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.levelText, { color: colors.text }]}>{item.level}</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={[styles.lastUpdated, { color: colors.icon }]}>Updated {item.lastUpdated}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFeaturedCourse = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.featuredCourseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('View featured course:', item.title)}
      activeOpacity={0.8}
    >
      <View style={styles.featuredCourseHeader}>
        <Text style={styles.featuredCourseImage}>{item.image}</Text>
        <View style={styles.featuredCourseInfo}>
          <Text style={[styles.featuredCourseTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.featuredCourseInstructor, { color: colors.icon }]}>by {item.instructor}</Text>
        </View>
        <View style={[styles.featuredBadge, { backgroundColor: colors.accent }]}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      </View>
      <View style={styles.featuredCourseStats}>
        <View style={styles.featuredStatItem}>
          <Text style={styles.featuredStatIcon}>⭐</Text>
          <Text style={[styles.featuredStatText, { color: colors.text }]}>{item.rating}</Text>
        </View>
        <View style={styles.featuredStatItem}>
          <Text style={styles.featuredStatIcon}>👥</Text>
          <Text style={[styles.featuredStatText, { color: colors.text }]}>{item.students.toLocaleString()}</Text>
        </View>
        <View style={styles.featuredStatItem}>
          <Text style={styles.featuredStatIcon}>⏱️</Text>
          <Text style={[styles.featuredStatText, { color: colors.text }]}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.featuredCoursePrice}>
        <Text style={[styles.featuredPriceText, { color: colors.primary }]}>${item.price}</Text>
        {item.originalPrice > item.price && (
          <Text style={[styles.featuredOriginalPrice, { color: colors.icon }]}>${item.originalPrice}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Enhanced Header */}
      <Animated.View 
        style={[
          styles.header,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>Explore Courses</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>
            Discover new skills and advance your career
          </Text>
        </View>
        <View style={styles.headerStats}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>156</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Courses</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.secondary }]}>12k+</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Students</Text>
          </View>
        </View>
      </Animated.View>

      {/* Enhanced Search and Filters */}
      <Animated.View 
        style={[
          styles.searchSection,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            placeholder="Search courses, instructors, or topics..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filterButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Sort Options */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.sortContainer}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortButton,
                {
                  backgroundColor: sortBy === option.value ? colors.primary : colors.surface,
                  borderColor: colors.border
                }
              ]}
              onPress={() => setSortBy(option.value)}
            >
              <Text style={[
                styles.sortButtonText,
                { color: sortBy === option.value ? colors.card : colors.text }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Enhanced Categories */}
      <Animated.View 
        style={[
          styles.categoriesSection,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category.name ? colors.primary : colors.card,
                  borderColor: selectedCategory === category.name ? colors.primary : colors.border
                }
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryButtonText,
                { color: selectedCategory === category.name ? colors.card : colors.text }
              ]}>
                {category.name}
              </Text>
              <Text style={[
                styles.categoryCount,
                { color: selectedCategory === category.name ? colors.card : colors.icon }
              ]}>
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && (
        <Animated.View 
          style={[
            styles.featuredSection,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Courses</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.featuredCoursesContainer}
          >
            {featuredCourses.map((course) => (
              <View key={course.id}>
                {renderFeaturedCourse({ item: course })}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}

      {/* New Courses Section */}
      {newCourses.length > 0 && (
        <Animated.View 
          style={[
            styles.newSection,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>New Courses</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.newCoursesContainer}
          >
            {newCourses.map((course) => (
              <View key={course.id}>
                {renderCourse({ item: course })}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}

      {/* All Courses Section */}
      <Animated.View 
        style={[
          styles.allCoursesSection,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            All Courses ({filteredCourses.length})
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Sort</Text>
          </TouchableOpacity>
        </View>
        
        {filteredCourses.map((course) => (
          <View key={course.id}>
            {renderCourse({ item: course })}
          </View>
        ))}
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
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  headerContent: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
    fontWeight: 'bold',
  },
  subtitle: {
    ...Typography.body,
    opacity: 0.8,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.sm,
  },
  statNumber: {
    ...Typography.h3,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    opacity: 0.8,
  },

  // Search Section
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: 16,
    marginRight: Spacing.sm,
    ...Shadows.sm,
  },
  filterButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  filterButtonText: {
    fontSize: 18,
  },
  sortContainer: {
    marginTop: Spacing.sm,
  },
  sortButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    marginRight: Spacing.sm,
    ...Shadows.sm,
  },
  sortButtonText: {
    ...Typography.caption,
    fontWeight: '600',
  },

  // Categories Section
  categoriesSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingLeft: Spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginRight: Spacing.md,
    alignItems: 'center',
    minWidth: 100,
    ...Shadows.sm,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  categoryButtonText: {
    ...Typography.caption,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  categoryCount: {
    ...Typography.small,
    opacity: 0.8,
  },

  // Section Headers
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
    color: '#007AFF',
  },

  // Featured Courses
  featuredSection: {
    marginBottom: Spacing.lg,
  },
  featuredCoursesContainer: {
    paddingLeft: Spacing.lg,
  },
  featuredCourseCard: {
    width: screenWidth * 0.8,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  featuredCourseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  featuredCourseImage: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  featuredCourseInfo: {
    flex: 1,
  },
  featuredCourseTitle: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  featuredCourseInstructor: {
    ...Typography.caption,
    opacity: 0.8,
  },
  featuredCourseStats: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  featuredStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  featuredStatIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  featuredStatText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  featuredCoursePrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredPriceText: {
    ...Typography.h4,
    fontWeight: 'bold',
    marginRight: Spacing.sm,
  },
  featuredOriginalPrice: {
    ...Typography.caption,
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },

  // New Courses
  newSection: {
    marginBottom: Spacing.lg,
  },
  newCoursesContainer: {
    paddingLeft: Spacing.lg,
  },

  // All Courses
  allCoursesSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  // Course Cards
  courseCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  courseImageContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  courseImage: {
    fontSize: 32,
  },
  featuredBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  featuredText: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  newText: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    marginBottom: Spacing.xs,
  },
  courseDescription: {
    ...Typography.small,
    opacity: 0.8,
    lineHeight: 18,
  },
  coursePriceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    ...Typography.h4,
    fontWeight: 'bold',
  },
  originalPrice: {
    ...Typography.caption,
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  courseStats: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  statIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  statText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  tagText: {
    ...Typography.small,
    fontWeight: '500',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  levelText: {
    ...Typography.small,
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    ...Typography.small,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  lastUpdated: {
    ...Typography.small,
    opacity: 0.6,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: Spacing.xxl,
  },
});

export default ExploreScreen;
