import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

const ProviderProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const profileStats = [
    { label: 'Rating', value: '4.9', icon: 'star' },
    { label: 'Jobs', value: '156', icon: 'briefcase' },
    { label: 'Reviews', value: '127', icon: 'chatbubbles' },
  ];

  const menuSections = [
    {
      title: 'Business',
      items: [
        { id: '1', title: 'My Services', icon: 'list', screen: 'ProviderServices' },
        { id: '2', title: 'Availability', icon: 'calendar', screen: 'ProviderAvailability' },
        { id: '3', title: 'Service Areas', icon: 'location', screen: 'ServiceAreas' },
        { id: '4', title: 'Portfolio', icon: 'images', screen: 'Portfolio' },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: '5', title: 'Profile Settings', icon: 'person', screen: 'ProfileSettings' },
        { id: '6', title: 'Payment Methods', icon: 'card', screen: 'PaymentMethods' },
        { id: '7', title: 'Notifications', icon: 'notifications', screen: 'Notifications' },
        { id: '8', title: 'Privacy & Security', icon: 'shield-checkmark', screen: 'Privacy' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: '9', title: 'Help Center', icon: 'help-circle', screen: 'HelpCenter' },
        { id: '10', title: 'Contact Support', icon: 'chatbubble-ellipses', screen: 'Support' },
        { id: '11', title: 'Terms & Conditions', icon: 'document-text', screen: 'Terms' },
        { id: '12', title: 'About', icon: 'information-circle', screen: 'About' },
      ],
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        nestedScrollEnabled
      >
        {/* Profile Header */}
        <LinearGradient colors={Gradients.hero} style={styles.header} locations={[0, 1]}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={100} color={Colors.textWhite} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name || 'Provider Name'}</Text>
          <Text style={styles.email}>{user?.email || 'provider@example.com'}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="create-outline" size={18} color={Colors.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon as any} size={22} color={Colors.primary} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Premium Upgrade */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.premiumCard} activeOpacity={0.8}>
            <LinearGradient colors={Gradients.primary} style={styles.premiumGradient} locations={[0, 1]}>
              <Ionicons name="rocket" size={32} color={Colors.textWhite} />
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumText}>
                Get priority bookings, featured listings, and more
              </Text>
              <View style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>Learn More</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.version}>Provider App v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.textWhite,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  premiumCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  premiumGradient: {
    padding: 24,
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 12,
    marginBottom: 8,
  },
  premiumText: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
  },
  premiumButton: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  premiumButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.error + '20',
    marginHorizontal: 20,
    marginTop: 20,
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
    color: Colors.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  version: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

export default ProviderProfileScreen;