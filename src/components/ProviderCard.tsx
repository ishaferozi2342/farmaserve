import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Colors Constants
const Colors = {
  card: '#FFFFFF',
  backgroundLight: '#F1F5F9',
  text: '#1E293B',
  textLight: '#64748B',
  star: '#FFD700',
};

// Types
interface Provider {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  jobsCompleted: number;
}

interface ProviderCardProps {
  provider: Provider;
  onPress?: () => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProviderDetail'>;

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onPress }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('ProviderDetail', { provider });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: provider.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.category}>{provider.category}</Text>
        <View style={styles.stats}>
          <View style={styles.rating}>
            <Icon name="star" size={16} color={Colors.star} />
            <Text style={styles.ratingText}>{provider.rating}</Text>
          </View>
          <Text style={styles.jobs}>{provider.jobsCompleted} jobs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  jobs: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

export default ProviderCard;
