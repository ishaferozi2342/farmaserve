import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Gradients } from '../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type ServiceDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceDetail'>;
type ServiceDetailScreenRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;

type ServiceDetailScreenProps = {
  navigation: ServiceDetailScreenNavigationProp;
  route: ServiceDetailScreenRouteProp;
};

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ navigation, route }) => {
  const { service } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const availableDates = [
    { id: '1', date: 'Today', time: '2:00 PM - 4:00 PM' },
    { id: '2', date: 'Tomorrow', time: '10:00 AM - 12:00 PM' },
    { id: '3', date: 'Nov 5', time: '3:00 PM - 5:00 PM' },
    { id: '4', date: 'Nov 6', time: '11:00 AM - 1:00 PM' },
  ];

  const handleBookNow = () => {
    if (!selectedDate) {
      return;
    }
    navigation.navigate('BookingConfirmation', { 
      service,
      selectedDate: availableDates.find(d => d.id === selectedDate)!
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        nestedScrollEnabled
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: service.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.category}>{service.category}</Text>
              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.price}>{service.price}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color={Colors.star} />
              <Text style={styles.rating}>{service.rating}</Text>
              <Text style={styles.reviews}>({service.reviews})</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={20} color={Colors.primary} />
              <Text style={styles.location}>{service.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Service</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.description}>
              Our professional service providers are highly trained and experienced. 
              We guarantee quality work and customer satisfaction. All our providers 
              are background-checked and insured for your peace of mind.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's Included</Text>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.featureText}>Professional equipment and materials</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.featureText}>Experienced and verified professionals</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.featureText}>Quality guarantee</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.featureText}>Customer support</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            {availableDates.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  selectedDate === slot.id && styles.timeSlotSelected
                ]}
                onPress={() => setSelectedDate(slot.id)}
              >
                <View style={styles.timeSlotLeft}>
                  <Text style={[
                    styles.timeSlotDate,
                    selectedDate === slot.id && styles.timeSlotTextSelected
                  ]}>
                    {slot.date}
                  </Text>
                  <Text style={[
                    styles.timeSlotTime,
                    selectedDate === slot.id && styles.timeSlotTextSelected
                  ]}>
                    {slot.time}
                  </Text>
                </View>
                <Ionicons 
                  name={selectedDate === slot.id ? "radio-button-on" : "radio-button-off"} 
                  size={24} 
                  color={selectedDate === slot.id ? Colors.primary : Colors.textLight} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.bookButton, !selectedDate && styles.bookButtonDisabled]}
          onPress={handleBookNow}
          disabled={!selectedDate}
        >
          <LinearGradient 
            colors={selectedDate ? [...Gradients.primary] : [Colors.textLight, Colors.textLight]} 
            style={styles.bookButtonGradient}
            locations={[0, 1]}
          >
            <Text style={styles.bookButtonText}>
              {selectedDate ? 'Book Now' : 'Select a Time Slot'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 150,
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
    backgroundColor: Colors.backgroundLight,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 24,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  timeSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    marginBottom: 12,
    backgroundColor: Colors.background,
  },
  timeSlotSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '20',
  },
  timeSlotLeft: {
    flex: 1,
  },
  timeSlotDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  timeSlotTime: {
    fontSize: 14,
    color: Colors.textLight,
  },
  timeSlotTextSelected: {
    color: Colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookButtonDisabled: {
    opacity: 0.6,
  },
  bookButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceDetailScreen;