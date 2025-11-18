import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

interface ProviderService {
  id: string;
  title: string;
  category: string;
  price: string;
  duration: string;
  isActive: boolean;
  bookings: number;
  rating: number;
  image: string;
}

const ProviderServicesScreen = ({ navigation }: any) => {
  const [services, setServices] = useState<ProviderService[]>([
    {
      id: '1',
      title: 'Premium Car Detailing',
      category: 'Auto Care',
      price: '$150 - $300',
      duration: '2-3 hours',
      isActive: true,
      bookings: 45,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800',
    },
    {
      id: '2',
      title: 'Mobile Car Wash',
      category: 'Auto Care',
      price: '$40 - $80',
      duration: '1 hour',
      isActive: true,
      bookings: 89,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=800',
    },
    {
      id: '3',
      title: 'Interior Detailing',
      category: 'Auto Care',
      price: '$80 - $150',
      duration: '1.5 hours',
      isActive: false,
      bookings: 23,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800',
    },
  ]);

  const toggleServiceStatus = (id: string) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Services</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddService')}
        >
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{services.length}</Text>
              <Text style={styles.statLabel}>Total Services</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {services.filter(s => s.isActive).length}
              </Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {services.reduce((sum, s) => sum + s.bookings, 0)}
              </Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
          </View>

          {/* Services List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Services</Text>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Image source={{ uri: service.image }} style={styles.serviceImage} />
                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <Text style={styles.serviceCategory}>{service.category}</Text>
                    </View>
                    <Switch
                      value={service.isActive}
                      onValueChange={() => toggleServiceStatus(service.id)}
                      trackColor={{ false: Colors.border, true: Colors.primary + '40' }}
                      thumbColor={service.isActive ? Colors.primary : Colors.textLight}
                    />
                  </View>

                  <View style={styles.serviceDetails}>
                    <View style={styles.serviceDetailItem}>
                      <Ionicons name="cash-outline" size={16} color={Colors.textLight} />
                      <Text style={styles.serviceDetailText}>{service.price}</Text>
                    </View>
                    <View style={styles.serviceDetailItem}>
                      <Ionicons name="time-outline" size={16} color={Colors.textLight} />
                      <Text style={styles.serviceDetailText}>{service.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.serviceStats}>
                    <View style={styles.serviceStatItem}>
                      <Ionicons name="calendar" size={14} color={Colors.primary} />
                      <Text style={styles.serviceStatText}>{service.bookings} bookings</Text>
                    </View>
                    <View style={styles.serviceStatItem}>
                      <Ionicons name="star" size={14} color={Colors.secondary} />
                      <Text style={styles.serviceStatText}>{service.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.serviceActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('EditService', { service })}
                    >
                      <Ionicons name="create-outline" size={18} color={Colors.primary} />
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.viewButton}
                      onPress={() => {
                        const mappedService = {
                          id: service.id,
                          title: service.title,
                          description: `${service.category} • ${service.duration}. Professional service by verified provider.`,
                          price: service.price,
                          location: 'Boston, MA',
                          rating: service.rating,
                          reviews: service.bookings,
                          image: service.image,
                          category: service.category,
                        };
                        navigation.navigate('ServiceDetail', { service: mappedService });
                      }}
                    >
                      <Ionicons name="eye-outline" size={18} color={Colors.text} />
                      <Text style={styles.viewButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Add Service CTA */}
          <TouchableOpacity
            style={styles.addServiceCard}
            onPress={() => navigation.navigate('AddService')}
          >
            <Ionicons name="add-circle" size={48} color={Colors.primary} />
            <Text style={styles.addServiceTitle}>Add New Service</Text>
            <Text style={styles.addServiceText}>
              Expand your offerings and reach more customers
            </Text>
          </TouchableOpacity>
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
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.backgroundLight,
  },
  serviceContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 12,
    color: Colors.textLight,
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  serviceDetailText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  serviceStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  serviceStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceStatText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary + '20',
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  addServiceCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 32,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary + '40',
    borderStyle: 'dashed',
  },
  addServiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  addServiceText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default ProviderServicesScreen;