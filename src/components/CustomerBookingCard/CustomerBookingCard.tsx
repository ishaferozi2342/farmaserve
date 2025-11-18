import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

export interface CustomerBookingCardProps {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: string;
  image: string;
  onPress?: () => void;
}

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

const CustomerBookingCard: React.FC<CustomerBookingCardProps> = ({
  serviceName,
  providerName,
  date,
  time,
  status,
  price,
  image,
  onPress,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <TouchableOpacity style={styles.bookingCard} activeOpacity={0.7} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.bookingImage} />
      <View style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.serviceName}>{serviceName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}> 
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetail}>
          <Ionicons name="person-outline" size={16} color={Colors.textLight} />
          <Text style={styles.detailText}>{providerName}</Text>
        </View>
        <View style={styles.bookingDetail}>
          <Ionicons name="calendar-outline" size={16} color={Colors.textLight} />
          <Text style={styles.detailText}>{date}</Text>
        </View>
        <View style={styles.bookingDetail}>
          <Ionicons name="time-outline" size={16} color={Colors.textLight} />
          <Text style={styles.detailText}>{time}</Text>
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomerBookingCard;
