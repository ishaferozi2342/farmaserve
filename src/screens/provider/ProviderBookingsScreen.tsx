import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { Booking } from '../../types';

interface ProviderBookingsScreenProps {
  navigation: any;
}

const ProviderBookingsScreen: React.FC<ProviderBookingsScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'upcoming' | 'completed'>('pending');

  const bookings: Booking[] = [
    {
      id: '1',
      service: 'Premium Car Detailing',
      customer: 'John Doe',
      customerPhone: '+1 234 567 8900',
      date: 'Nov 5, 2025',
      time: '2:00 PM - 4:00 PM',
      location: '123 Main St, Los Angeles, CA',
      price: '$200',
      status: 'pending',
      paymentStatus: 'pending',
    },
    {
      id: '2',
      service: 'Mobile Car Wash',
      customer: 'Jane Smith',
      customerPhone: '+1 234 567 8901',
      date: 'Nov 6, 2025',
      time: '10:00 AM - 11:00 AM',
      location: '456 Oak Ave, Beverly Hills, CA',
      price: '$60',
      status: 'confirmed',
      paymentStatus: 'paid',
    },
    {
      id: '3',
      service: 'Interior Detailing',
      customer: 'Mike Johnson',
      customerPhone: '+1 234 567 8902',
      date: 'Oct 28, 2025',
      time: '3:00 PM - 4:30 PM',
      location: '789 Pine Rd, Santa Monica, CA',
      price: '$120',
      status: 'completed',
      paymentStatus: 'paid',
    },
  ];

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'pending') return booking.status === 'pending';
    if (activeTab === 'upcoming') return booking.status === 'confirmed' || booking.status === 'in-progress';
    if (activeTab === 'completed') return booking.status === 'completed' || booking.status === 'cancelled';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return Colors.warning;
      case 'confirmed': return Colors.info;
      case 'in-progress': return Colors.primary;
      case 'completed': return Colors.success;
      case 'cancelled': return Colors.error;
      default: return Colors.textLight;
    }
  };

  const handleAcceptBooking = (id: string) => {
    Alert.alert(
      'Accept Booking',
      'Are you sure you want to accept this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Accept', onPress: () => console.log('Accepted:', id) }
      ]
    );
  };

  const handleDeclineBooking = (id: string) => {
    Alert.alert(
      'Decline Booking',
      'Are you sure you want to decline this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Decline', style: 'destructive', onPress: () => console.log('Declined:', id) }
      ]
    );
  };

  const handleStartJob = (id: string) => {
    Alert.alert('Start Job', 'Mark this job as in progress?');
  };

  const handleCompleteJob = (id: string) => {
    Alert.alert('Complete Job', 'Mark this job as completed?');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Fixed Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
            Pending
          </Text>
          <View style={[styles.tabBadge, { backgroundColor: Colors.warning }]}>
            <Text style={styles.tabBadgeText}>
              {bookings.filter(b => b.status === 'pending').length}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No {activeTab} bookings</Text>
            <Text style={styles.emptyText}>
              Your {activeTab} bookings will appear here
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              {/* Booking Card Content - Same as before */}
              <View style={styles.bookingHeader}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingService}>{booking.service}</Text>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                        {booking.status}
                      </Text>
                    </View>
                    <View style={[
                      styles.paymentBadge,
                      { backgroundColor: booking.paymentStatus === 'paid' ? Colors.success + '20' : Colors.warning + '20' }
                    ]}>
                      <Icon
                        name={booking.paymentStatus === 'paid' ? 'checkmark-circle' : 'time'}
                        size={12}
                        color={booking.paymentStatus === 'paid' ? Colors.success : Colors.warning}
                      />
                      <Text style={[
                        styles.paymentText,
                        { color: booking.paymentStatus === 'paid' ? Colors.success : Colors.warning }
                      ]}>
                        {booking.paymentStatus}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.bookingPrice}>{booking.price}</Text>
              </View>

              <View style={styles.customerSection}>
                <View style={styles.customerIcon}>
                  <Icon name="person" size={20} color={Colors.primary} />
                </View>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{booking.customer}</Text>
                  <Text style={styles.customerPhone}>{booking.customerPhone}</Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Icon name="call" size={20} color={Colors.success} />
                </TouchableOpacity>
              </View>

              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Icon name="calendar-outline" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="time-outline" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="location-outline" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{booking.location}</Text>
                </View>
              </View>

              <View style={styles.bookingActions}>
                {booking.status === 'pending' && (
                  <>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAcceptBooking(booking.id)}
                    >
                      <Icon name="checkmark" size={18} color={Colors.textWhite} />
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.declineButton}
                      onPress={() => handleDeclineBooking(booking.id)}
                    >
                      <Icon name="close" size={18} color={Colors.error} />
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <>
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => handleStartJob(booking.id)}
                    >
                      <Icon name="play" size={18} color={Colors.textWhite} />
                      <Text style={styles.startButtonText}>Start Job</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </>
                )}
                {booking.status === 'in-progress' && (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleCompleteJob(booking.id)}
                  >
                    <Icon name="checkmark-done" size={18} color={Colors.textWhite} />
                    <Text style={styles.completeButtonText}>Complete Job</Text>
                  </TouchableOpacity>
                )}
                {booking.status === 'completed' && (
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain exactly the same as in your original code
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    gap: 6,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
  tabTextActive: {
    color: Colors.textWhite,
  },
  tabBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bookingPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  customerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  customerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 12,
    color: Colors.textLight,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textLight,
    flex: 1,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.success,
    paddingVertical: 12,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
  startButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.success,
    paddingVertical: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  viewDetailsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  viewDetailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default ProviderBookingsScreen;