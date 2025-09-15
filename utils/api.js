import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const getApiBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }
  // Derive from Expo host (dev)
  const expoHost = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoClient?.hostUri || '';
  if (expoHost) {
    const host = expoHost.split(':')[0];
    const protocol = Platform.OS === 'android' ? 'http' : 'http';
    return `${protocol}://${host}:8000`;
  }
  // Fallback to localhost (emulator)
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
  }
  return 'http://localhost:8000';
};


