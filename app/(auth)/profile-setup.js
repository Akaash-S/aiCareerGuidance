
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Alert, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown';
import MultiSelect from '../../components/MultiSelect';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const interestOptions = ["Coding", "Design", "Business", "Science", "Arts", "Marketing", "Finance", "Healthcare"];
  const skillOptions = ["JavaScript", "Python", "React", "Excel", "Presentation", "Leadership", "Communication", "Project Management", "Data Analysis", "UI/UX Design"];

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!selectedInterest) {
      Alert.alert('Error', 'Please select an interest');
      return;
    }
    if (selectedSkills.length === 0) {
      Alert.alert('Error', 'Please select at least one skill');
      return;
    }
    try {
      let token = await AsyncStorage.getItem('session_token');
      if (!token) {
        // Attempt silent refresh via Firebase if session not yet stored
        const { auth } = require('../../firebase');
        const currentUser = auth.currentUser;
        if (currentUser) {
          const idToken = await currentUser.getIdToken(true);
          const baseUrl = getApiBaseUrl();
          const res = await fetch(`${baseUrl}/auth/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
          if (res.ok) {
            const data = await res.json();
            await AsyncStorage.setItem('session_token', data.token);
            token = data.token;
          }
        }
      }
      if (!token) {
        Alert.alert('Not signed in', 'Please sign in first.');
        return;
      }
      const res = await fetch(`${getApiBaseUrl()}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          interests: [selectedInterest],
          skills: selectedSkills,
          grades: {},
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save profile');
      }
      Alert.alert('Profile Saved', 'Your profile has been saved successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/index') }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>What's your name?</Text>
            <Text style={[styles.stepSubtitle, { color: colors.icon }]}>
              This will help personalize your experience
            </Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor={colors.icon}
              value={name}
              onChangeText={setName}
              style={[
                styles.input,
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text
                }
              ]}
            />
          </View>
        );
      
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>What interests you most?</Text>
            <Text style={[styles.stepSubtitle, { color: colors.icon }]}>
              Choose your primary area of interest
            </Text>
            <Dropdown
              placeholder="Select your main interest"
              options={interestOptions}
              selectedValue={selectedInterest}
              onValueChange={setSelectedInterest}
            />
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>What are your skills?</Text>
            <Text style={[styles.stepSubtitle, { color: colors.icon }]}>
              Select all that apply to you
            </Text>
            <MultiSelect
              placeholder="Select your skills"
              options={skillOptions}
              selectedValues={selectedSkills}
              onValuesChange={setSelectedSkills}
            />
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>AI</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Complete Your Profile</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>
            Help us personalize your career journey
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            {[1, 2, 3].map((step) => (
              <View
                key={step}
                style={[
                  styles.progressStep,
                  {
                    backgroundColor: step <= currentStep ? colors.primary : colors.border,
                  }
                ]}
              />
            ))}
          </View>
          <Text style={[styles.progressText, { color: colors.icon }]}>
            Step {currentStep} of 3
          </Text>
        </View>

        {renderStep()}

        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={[styles.backButton, { borderColor: colors.border }]}
              onPress={prevStep}
            >
              <Text style={[styles.backButtonText, { color: colors.text }]}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              { 
                backgroundColor: currentStep === 3 ? colors.success : colors.primary,
                flex: currentStep === 1 ? 1 : 0.6
              }
            ]}
            onPress={currentStep === 3 ? saveProfile : nextStep}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? 'Complete Setup' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.8,
  },
  progressContainer: {
    marginBottom: Spacing.xl,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  progressText: {
    ...Typography.caption,
    textAlign: 'center',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  stepTitle: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepSubtitle: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
    ...Shadows.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  backButton: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginRight: Spacing.md,
  },
  backButtonText: {
    ...Typography.body,
    fontWeight: '600',
  },
  nextButton: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  nextButtonText: {
    ...Typography.body,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ProfileSetup;
