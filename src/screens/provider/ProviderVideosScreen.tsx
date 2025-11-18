import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');
const CARD = (width - 16 * 2 - 12) / 2;

const dummyVideos = [
  { id: 'v1', title: 'Interior Detailing', thumb: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600' },
  { id: 'v2', title: 'Floor Cleaning', thumb: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600' },
  { id: 'v3', title: 'Lawn Care', thumb: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e4?q=80&w=600' },
  { id: 'v4', title: 'Pool Service', thumb: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=600' },
];

const ProviderVideosScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Videos</Text>
      <FlatList
        data={dummyVideos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
        renderItem={({ item }) => (
          <Pressable android_ripple={{ color: '#00000020' }} style={styles.card}>
            <Image source={{ uri: item.thumb }} style={styles.thumb} />
            <Text style={styles.caption} numberOfLines={2}>{item.title}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.text, padding: 16 },
  card: { width: CARD, backgroundColor: Colors.card, borderRadius: 12, overflow: 'hidden' },
  thumb: { width: '100%', height: CARD * 0.6 },
  caption: { padding: 10, color: Colors.text, fontWeight: '600' },
});

export default ProviderVideosScreen;