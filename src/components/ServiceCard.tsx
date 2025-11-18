import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Service } from '../types';

// Colors Constants
const Colors = {
  card: '#FFFFFF',
  backgroundLight: '#F1F5F9',
  text: '#1E293B',
  textLight: '#64748B',
  primary: '#0066FF',
  star: '#FFD700',
};

interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'ServiceDetail'>;

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  const navigation = useNavigation<NavigationProp>();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('ServiceDetail', { service });
    }
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: service.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.price}>{service.price}</Text>
        <Text style={styles.title} numberOfLines={2}>{service.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{service.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.location}>
            <Icon name="location-outline" size={14} color={Colors.textLight} />
            <Text style={styles.locationText}>{service.location}</Text>
          </View>
          <View style={styles.rating}>
            <Icon name="star" size={14} color={Colors.star} />
            <Text style={styles.ratingText}>{service.rating}</Text>
            <Text style={styles.reviewsText}>({service.reviews})</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    backgroundColor: Colors.backgroundLight,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 2,
  },
});

export default ServiceCard;