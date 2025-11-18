import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../constants/Colors';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

type DashboardScreenProps = {
  navigation: DashboardScreenNavigationProp;
};

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: 'Services' | 'Bookings' | 'Profile';
  params?: any;
}

interface DashboardStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { user } = useAuth();

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Book Service',
      icon: 'calendar',
      color: Colors.primary,
      route: 'Services',
    },
    {
      id: '2',
      title: 'My Bookings',
      icon: 'list',
      color: Colors.secondary,
      route: 'Bookings',
    },
    {
      id: '3',
      title: 'Browse Services',
      icon: 'grid',
      color: Colors.info,
      route: 'Services',
    },
    {
      id: '4',
      title: 'My Profile',
      icon: 'person',
      color: Colors.success,
      route: 'Profile',
    },
  ];

  const dashboardStats: DashboardStat[] = [
    {
      id: '1',
      label: 'Active Bookings',
      value: '2',
      icon: 'time',
      color: Colors.primary,
    },
    {
      id: '2',
      label: 'Completed',
      value: '12',
      icon: 'checkmark-circle',
      color: Colors.success,
    },
    {
      id: '3',
      label: 'Favorites',
      value: '5',
      icon: 'heart',
      color: Colors.error,
    },
    {
      id: '4',
      label: 'Wallet',
      value: '$250',
      icon: 'wallet',
      color: Colors.secondary,
    },
  ];

  const recentActivities = [
    {
      id: '1',
      title: 'Booking Confirmed',
      description: 'Premium Car Detailing scheduled for Nov 5',
      time: '2 hours ago',
      icon: 'checkmark-circle',
      color: Colors.success,
    },
    {
      id: '2',
      title: 'Service Completed',
      description: 'Deep Home Cleaning completed successfully',
      time: '1 day ago',
      icon: 'star',
      color: Colors.secondary,
    },
    {
      id: '3',
      title: 'Payment Processed',
      description: 'Payment of $150 processed for cleaning service',
      time: '2 days ago',
      icon: 'card',
      color: Colors.info,
    },
  ];

  const upcomingBookings = [
    {
      id: '1',
      service: 'Premium Car Detailing',
      date: 'Nov 5, 2025',
      time: '2:00 PM',
      provider: 'John Smith',
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'Lawn Maintenance',
      date: 'Nov 8, 2025',
      time: '10:00 AM',
      provider: 'Green Gardens',
      status: 'pending',
    },
  ];

  const handleQuickAction = (action: QuickAction) => {
    navigation.navigate('Main', { 
      screen: action.route,
      params: action.params 
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Fixed Header */}
      <LinearGradient colors={Gradients.hero} style={styles.header} locations={[0, 1]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications" size={24} color={Colors.textWhite} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >

        {/* Dashboard Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {dashboardStats.map((stat) => (
              <TouchableOpacity 
                key={stat.id} 
                style={styles.statCard}
                onPress={() => {
                  if (stat.label === 'Active Bookings' || stat.label === 'Completed') {
                    navigation.navigate('Main', { screen: 'Bookings' });
                  } else if (stat.label === 'Favorites') {
                    navigation.navigate('Main', { screen: 'Services' });
                  } else if (stat.label === 'Wallet') {
                    navigation.navigate('Main', { screen: 'Profile' });
                  }
                }}
              >
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Bookings' })}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {upcomingBookings.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.bookingIcon}>
                  <Ionicons name="calendar" size={20} color={Colors.primary} />
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingService}>{booking.service}</Text>
                  <Text style={styles.bookingProvider}>by {booking.provider}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: booking.status === 'confirmed' ? Colors.success + '20' : Colors.warning + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: booking.status === 'confirmed' ? Colors.success : Colors.warning }
                  ]}>
                    {booking.status}
                  </Text>
                </View>
              </View>
              <View style={styles.bookingDetails}>
                <View style={styles.bookingDetailItem}>
                  <Ionicons name="calendar-outline" size={14} color={Colors.textLight} />
                  <Text style={styles.bookingDetailText}>{booking.date}</Text>
                </View>
                <View style={styles.bookingDetailItem}>
                  <Ionicons name="time-outline" size={14} color={Colors.textLight} />
                  <Text style={styles.bookingDetailText}>{booking.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <Ionicons name={activity.icon} size={20} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Help & Support */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.helpCard}
            onPress={() => navigation.navigate('Help')}
          >
            <LinearGradient colors={Gradients.primary} style={styles.helpGradient} locations={[0, 1]}>
              <Ionicons name="help-circle" size={32} color={Colors.textWhite} />
              <Text style={styles.helpTitle}>Need Help?</Text>
              <Text style={styles.helpText}>Our support team is here 24/7</Text>
              <View style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Contact Support</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: Colors.textWhite,
    opacity: 0.9,
    fontWeight: '400',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textWhite,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  bookingCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  bookingProvider: {
    fontSize: 12,
    color: Colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  bookingDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookingDetailText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    color: Colors.textLight,
  },
  helpCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  helpGradient: {
    padding: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default DashboardScreen;