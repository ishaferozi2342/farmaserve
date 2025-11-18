import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface StatsRowProps {
  items: StatItem[];
}

const StatsRow: React.FC<StatsRowProps> = ({ items }) => {
  return (
    <View style={styles.statsGrid}>
      {items.map((stat) => (
        <View key={stat.id} style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
            <Ionicons name={stat.icon as any} size={24} color={stat.color} />
          </View>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

export default StatsRow;
