import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

export interface ProviderBookingCardProps {
  id: string;
  service: string;
  customer: string;
  customerPhone: string;
  date: string;
  time: string;
  location: string;
  price: string;
  status: string;
  paymentStatus: 'paid' | 'pending';
}

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

const ProviderBookingCard: React.FC<ProviderBookingCardProps> = ({
  service,
  customer,
  customerPhone,
  date,
  time,
  location,
  price,
  status,
  paymentStatus,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingService}>{service}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {status}
              </Text>
            </View>
            <View style={[
              styles.paymentBadge,
              { backgroundColor: paymentStatus === 'paid' ? Colors.success + '20' : Colors.warning + '20' },
            ]}>
              <Ionicons
                name={paymentStatus === 'paid' ? 'checkmark-circle' : 'time'}
                size={12}
                color={paymentStatus === 'paid' ? Colors.success : Colors.warning}
              />
              <Text style={[
                styles.paymentText,
                { color: paymentStatus === 'paid' ? Colors.success : Colors.warning },
              ]}>
                {paymentStatus}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.bookingPrice}>{price}</Text>
      </View>

      <View style={styles.customerSection}>
        <View style={styles.customerIcon}>
          <Ionicons name="person" size={20} color={Colors.primary} />
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{customer}</Text>
          <Text style={styles.customerPhone}>{customerPhone}</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color={Colors.success} />
        </TouchableOpacity>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={Colors.textLight} />
          <Text style={styles.detailText}>{date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={Colors.textLight} />
          <Text style={styles.detailText}>{time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={Colors.textLight} />
          <Text style={styles.detailText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProviderBookingCard;
