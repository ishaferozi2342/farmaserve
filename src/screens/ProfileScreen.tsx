import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { getColors, getGradients } from '../constants/Colors';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Profile'>,
  StackNavigationProp<RootStackParamList>
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const Colors = getColors(isDark);
  const Gradients = getGradients(isDark);
  
  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background }]} edges={['top']}>
      <LinearGradient colors={Gradients.hero} style={styles.header} locations={[0, 1]}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color={Colors.textWhite} />
        </View>
        <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
      </LinearGradient>

      <ScrollView 
        style={[styles.container, { backgroundColor: Colors.background }]} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        nestedScrollEnabled
      >
      <View style={[styles.section, styles.shadowBox, { backgroundColor: Colors.card }]}>
        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="location-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Saved Addresses</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="card-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.shadowBox, { backgroundColor: Colors.card }]}>
        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Preferences</Text>
        
        <View style={styles.menuItem}>
          <Ionicons name={isDark ? "moon" : "sunny"} size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={isDark ? Colors.primary : Colors.backgroundLight}
          />
        </View>

        <TouchableOpacity 
          style={styles.menuItem} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="language-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.shadowBox, { backgroundColor: Colors.card }]}>
        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Support</Text>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Help')}
        >
          <Ionicons name="help-circle-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Help Center</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Terms & Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="shield-checkmark-outline" size={24} color={Colors.text} />
          <Text style={[styles.menuText, { color: Colors.text }]}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: Colors.error + '20' }]} onPress={handleLogout} activeOpacity={0.7}>
        <Ionicons name="log-out-outline" size={20} color={Colors.error} />
        <Text style={[styles.logoutText, { color: Colors.error }]}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={[styles.version, { color: Colors.textLight }]}>Version 1.0.0</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    opacity: 0.6,
  },
});

export default ProfileScreen;