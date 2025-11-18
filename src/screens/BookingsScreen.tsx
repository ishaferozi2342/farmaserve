import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';

interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: string;
  image: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    serviceName: 'Premium Car Detailing',
    providerName: 'John Smith',
    date: 'Nov 5, 2025',
    time: '2:00 PM - 4:00 PM',
    status: 'upcoming',
    price: '$200',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800',
  },
  {
    id: '2',
    serviceName: 'Deep Home Cleaning',
    providerName: 'Sarah Johnson',
    date: 'Oct 28, 2025',
    time: '10:00 AM - 12:00 PM',
    status: 'completed',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
  },
];

const BookingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const filteredBookings = mockBookings.filter(booking => 
    activeTab === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return Colors.info;
      case 'completed':
        return Colors.success;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.textLight;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      {/* Fixed Tabs */}
      <View style={styles.tabContainer}>
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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={80} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No {activeTab} Bookings</Text>
            <Text style={styles.emptyText}>
              Your {activeTab} bookings will appear here
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard} activeOpacity={0.7}>
              <Image source={{ uri: booking.image }} style={styles.bookingImage} />
              <View style={styles.bookingContent}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.serviceName}>{booking.serviceName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.bookingDetail}>
                  <Ionicons name="person-outline" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{booking.providerName}</Text>
                </View>
                
                <View style={styles.bookingDetail}>
                  <Ionicons name="calendar-outline" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                
                <View style={styles.bookingDetail}>
                  <Ionicons name="time-outline" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
                
                <View style={styles.bookingFooter}>
                  <Text style={styles.price}>{booking.price}</Text>
                  {booking.status === 'upcoming' && (
                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                      <Text style={styles.actionButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                  )}
                  {booking.status === 'completed' && (
                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                      <Text style={styles.actionButtonText}>Book Again</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: Colors.backgroundLight,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textLight,
  },
  tabTextActive: {
    color: Colors.textWhite,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  bookingCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  bookingImage: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.backgroundLight,
  },
  bookingContent: {
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 8,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
});

export default BookingsScreen;
