import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const { height } = Dimensions.get('window');

const dummyReels = [
  { id: 'r1', caption: 'Shiny car detailing', uri: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?q=80&w=1200' },
  { id: 'r2', caption: 'Deep home cleaning tips', uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200' },
  { id: 'r3', caption: 'Garden makeover in 30s', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200' },
];

const ProviderReelsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={dummyReels}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ImageBackground source={{ uri: item.uri }} style={styles.reel}>
            <View style={styles.overlay} />
            <View style={styles.actions}>
              <Pressable android_ripple={{ color: '#ffffff20' }} style={styles.actionBtn}>
                <Ionicons name="heart" size={26} color={Colors.textWhite} />
                <Text style={styles.actionText}>123</Text>
              </Pressable>
              <Pressable android_ripple={{ color: '#ffffff20' }} style={styles.actionBtn}>
                <Ionicons name="chatbubble" size={26} color={Colors.textWhite} />
                <Text style={styles.actionText}>12</Text>
              </Pressable>
              <Pressable android_ripple={{ color: '#ffffff20' }} style={styles.actionBtn}>
                <Ionicons name="share-social" size={26} color={Colors.textWhite} />
              </Pressable>
            </View>
            <View style={styles.captionBar}>
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          </ImageBackground>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  reel: { height: height - 40, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#00000030' },
  actions: { position: 'absolute', right: 16, bottom: 100, alignItems: 'center', gap: 18 },
  actionBtn: { alignItems: 'center' },
  actionText: { color: Colors.textWhite, marginTop: 6 },
  captionBar: { padding: 16 },
  caption: { color: Colors.textWhite, fontSize: 16, fontWeight: '600' },
});

export default ProviderReelsScreen;