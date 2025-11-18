import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const ProviderDashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();

  const todayStats = [
    { id: '1', label: 'Today\'s Bookings', value: '5', icon: 'calendar', color: Colors.primary },
    { id: '2', label: 'Pending Requests', value: '3', icon: 'time', color: Colors.warning },
    { id: '3', label: 'Completed Today', value: '2', icon: 'checkmark-circle', color: Colors.success },
    { id: '4', label: 'Today\'s Earnings', value: '$450', icon: 'cash', color: Colors.secondary },
  ];

  const contentActions = [
    { id: 'c1', title: 'Stories', icon: 'images', color: Colors.primary, screen: 'ProviderStories' },
    { id: 'c2', title: 'Reels', icon: 'play', color: Colors.secondary, screen: 'ProviderReels' },
    { id: 'c3', title: 'Videos', icon: 'videocam', color: Colors.success, screen: 'ProviderVideos' },
  ];

  const overallStats = [
    { id: '1', label: 'Total Jobs', value: '156', icon: 'briefcase', color: Colors.info },
    { id: '2', label: 'Rating', value: '4.9', icon: 'star', color: Colors.secondary },
    { id: '3', label: 'Total Earnings', value: '$12.5K', icon: 'wallet', color: Colors.success },
    { id: '4', label: 'Active Services', value: '8', icon: 'grid', color: Colors.primary },
  ];

  const quickActions = [
    { id: '1', title: 'My Services', icon: 'list', color: Colors.primary, screen: 'ProviderServices' },
    { id: '2', title: 'Bookings', icon: 'calendar', color: Colors.secondary, screen: 'ProviderBookings' },
    { id: '3', title: 'Earnings', icon: 'trending-up', color: Colors.success, screen: 'ProviderEarnings' },
    { id: '4', title: 'Reviews', icon: 'star', color: Colors.warning, screen: 'ProviderReviews' },
  ];

  const upcomingJobs = [
    {
      id: '1',
      service: 'Premium Car Detailing',
      customer: 'John Doe',
      time: '2:00 PM - 4:00 PM',
      location: '123 Main St, Los Angeles',
      price: '$200',
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'Deep Home Cleaning',
      customer: 'Jane Smith',
      time: '10:00 AM - 12:00 PM',
      location: '456 Oak Ave, Beverly Hills',
      price: '$150',
      status: 'pending',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Fixed Header */}
      <LinearGradient colors={Gradients.hero} style={styles.header} locations={[0, 1]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Provider Dashboard</Text>
            <Text style={styles.userName}>{user?.name || 'Provider'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications" size={24} color={Colors.textWhite} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="settings" size={24} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >

        {/* Today's Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            {todayStats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Jobs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProviderBookings')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {upcomingJobs.map((job) => (
            <TouchableOpacity key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View style={styles.jobIcon}>
                  <Ionicons name="briefcase" size={20} color={Colors.primary} />
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobService}>{job.service}</Text>
                  <Text style={styles.jobCustomer}>Customer: {job.customer}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: job.status === 'confirmed' ? Colors.success + '20' : Colors.warning + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: job.status === 'confirmed' ? Colors.success : Colors.warning }
                  ]}>
                    {job.status}
                  </Text>
                </View>
              </View>
              <View style={styles.jobDetails}>
                <View style={styles.jobDetailItem}>
                  <Ionicons name="time-outline" size={14} color={Colors.textLight} />
                  <Text style={styles.jobDetailText}>{job.time}</Text>
                </View>
                <View style={styles.jobDetailItem}>
                  <Ionicons name="location-outline" size={14} color={Colors.textLight} />
                  <Text style={styles.jobDetailText}>{job.location}</Text>
                </View>
              </View>
              <View style={styles.jobFooter}>
                <Text style={styles.jobPrice}>{job.price}</Text>
                <View style={styles.jobActions}>
                  {job.status === 'pending' && (
                    <>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.declineButton}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {job.status === 'confirmed' && (
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View Details</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overall Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.statsGrid}>
            {overallStats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Create Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create Content</Text>
          <View style={styles.quickActionsGrid}>
            {contentActions.map((item) => (
              <Pressable
                key={item.id}
                android_ripple={{ color: '#00000010' }}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={28} color={item.color} />
                </View>
                <Text style={styles.quickActionTitle}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Upgrade Card */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.upgradeCard}>
            <LinearGradient colors={Gradients.primary} style={styles.upgradeGradient} locations={[0, 1]}>
              <Ionicons name="rocket" size={32} color={Colors.textWhite} />
              <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
              <Text style={styles.upgradeText}>Get more bookings and exclusive features</Text>
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Learn More</Text>
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
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
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
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 3 - 8,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
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
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobService: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  jobCustomer: {
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
  jobDetails: {
    marginBottom: 12,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  jobDetailText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  jobPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: Colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  declineButton: {
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  viewButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  upgradeCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  upgradeGradient: {
    padding: 24,
    alignItems: 'center',
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 12,
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
});

export default ProviderDashboardScreen;