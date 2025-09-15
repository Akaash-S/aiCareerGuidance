
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
  Alert, 
  StyleSheet, 
  ScrollView,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            try {
              await signOut(auth);
              console.log('User signed out successfully');
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible and all your data will be permanently lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'This is your last chance. Are you absolutely sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes, Delete Forever', onPress: () => console.log('Account deletion requested'), style: 'destructive' },
              ]
            );
          }, 
          style: 'destructive' 
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, isLast = false }) => (
    <TouchableOpacity 
      style={[
        styles.settingItem,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
        isLast && styles.lastItem
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.icon }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.profileContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.profileInitial}>A</Text>
        </View>
        <Text style={[styles.profileName, { color: colors.text }]}>Alex Johnson</Text>
        <Text style={[styles.profileEmail, { color: colors.icon }]}>alex.johnson@email.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        
        <SettingItem
          icon="🌙"
          title="Dark Mode"
          subtitle="Switch between light and dark themes"
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDarkMode ? colors.card : colors.icon}
            />
          }
        />
        
        <SettingItem
          icon="🔔"
          title="Notifications"
          subtitle="Receive push notifications"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notifications ? colors.card : colors.icon}
            />
          }
        />
        
        <SettingItem
          icon="📧"
          title="Email Updates"
          subtitle="Get updates via email"
          rightComponent={
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={emailUpdates ? colors.card : colors.icon}
            />
          }
          isLast
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        
        <SettingItem
          icon="👤"
          title="Edit Profile"
          subtitle="Update your personal information"
          onPress={() => console.log('Edit profile')}
        />
        
        <SettingItem
          icon="🔒"
          title="Privacy & Security"
          subtitle="Manage your privacy settings"
          onPress={() => console.log('Privacy settings')}
        />
        
        <SettingItem
          icon="📊"
          title="Data & Analytics"
          subtitle="View your learning analytics"
          onPress={() => console.log('Analytics')}
        />
        
        <SettingItem
          icon="❓"
          title="Help & Support"
          subtitle="Get help and contact support"
          onPress={() => console.log('Help')}
          isLast
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions</Text>
        
        <SettingItem
          icon="📤"
          title="Export Data"
          subtitle="Download your data"
          onPress={() => console.log('Export data')}
        />
        
        <SettingItem
          icon="🔄"
          title="Sync Account"
          subtitle="Sync your data across devices"
          onPress={() => console.log('Sync account')}
        />
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.warning }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.deleteButton, { backgroundColor: colors.error }]}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>🗑️ Delete Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          AI Career Mentor v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    ...Typography.body,
    opacity: 0.8,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    ...Shadows.sm,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  settingSubtitle: {
    ...Typography.caption,
    opacity: 0.8,
  },
  logoutButton: {
    margin: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  logoutButtonText: {
    ...Typography.body,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    margin: Spacing.lg,
    marginTop: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  deleteButtonText: {
    ...Typography.body,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  footerText: {
    ...Typography.caption,
    opacity: 0.6,
  },
});

export default SettingsScreen;
