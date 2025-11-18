import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Colors Constants
const Colors = {
  primary: '#0066FF',
  textWhite: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
};

// Gradients (using solid colors as fallback)
const Gradients = {
  primary: ['#0066FF', '#0052CC'],
};

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  servicesCount: number;
  icon: string;
}

interface CategoryCardProps {
  category: ServiceCategory;
  onPress?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: Colors.primary }]}>
        <Icon name={category.icon as any} size={28} color={Colors.textWhite} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>
        <Text style={styles.servicesCount}>{category.servicesCount} services available</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  servicesCount: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default CategoryCard;