import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import { serviceCategories, featuredServices } from '../constants/Data';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import { MainTabParamList, RootStackParamList } from '../types';

type ServicesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Services'>,
  StackNavigationProp<RootStackParamList>
>;

type ServicesScreenProps = {
  navigation: ServicesScreenNavigationProp;
  route: RouteProp<MainTabParamList, 'Services'>;
};

const ServicesScreen: React.FC<ServicesScreenProps> = ({ navigation, route }) => {
  const categoryId = route.params?.categoryId;
  const selectedCategory = categoryId 
    ? serviceCategories.find(cat => cat.id === categoryId) 
    : null;

  const filteredServices = categoryId && selectedCategory
    ? featuredServices.filter(service => {
        const categoryName = selectedCategory.name.toLowerCase();
        const serviceCategory = service.category.toLowerCase();
        
        // Match based on category keywords
        if (categoryName.includes('plumbing') || categoryName.includes('electrical')) {
          return serviceCategory.includes('plumbing') || serviceCategory.includes('electrical');
        }
        if (categoryName.includes('auto') || categoryName.includes('car')) {
          return serviceCategory.includes('auto') || serviceCategory.includes('car');
        }
        if (categoryName.includes('home') || categoryName.includes('cleaning')) {
          return serviceCategory.includes('home') || serviceCategory.includes('cleaning');
        }
        if (categoryName.includes('handyman') || categoryName.includes('repair')) {
          return serviceCategory.includes('handyman') || serviceCategory.includes('repair') || serviceCategory.includes('painting');
        }
        if (categoryName.includes('beauty') || categoryName.includes('wellness')) {
          return serviceCategory.includes('beauty') || serviceCategory.includes('salon') || serviceCategory.includes('wellness');
        }
        if (categoryName.includes('garden') || categoryName.includes('outdoor')) {
          return serviceCategory.includes('garden') || serviceCategory.includes('landscape') || serviceCategory.includes('outdoor');
        }
        if (categoryName.includes('appliance') || categoryName.includes('it')) {
          return serviceCategory.includes('computer') || serviceCategory.includes('it') || serviceCategory.includes('appliance') || serviceCategory.includes('tech');
        }
        
        // Default: check if service category includes any word from the category name
        return serviceCategory.includes(categoryName) || categoryName.includes(serviceCategory);
      })
    : featuredServices;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Fixed Header */}
      <View style={styles.header}>
        {categoryId && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.setParams({ categoryId: undefined })}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, !categoryId && styles.titleCentered]}>
          {selectedCategory ? selectedCategory.name : 'All Services'}
        </Text>
        {categoryId && <View style={styles.placeholder} />}
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >

      {!categoryId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Categories</Text>
          {serviceCategories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              onPress={() => navigation.setParams({ categoryId: category.id })}
            />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedCategory ? `${selectedCategory.name} Services` : 'Featured Services'}
        </Text>
        {filteredServices.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyText}>No services found in this category</Text>
            <Text style={styles.emptySubtext}>Try browsing other categories</Text>
          </View>
        ) : (
          <View style={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  titleCentered: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  servicesGrid: {
    // Services will have their own margins from ServiceCard component
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ServicesScreen;