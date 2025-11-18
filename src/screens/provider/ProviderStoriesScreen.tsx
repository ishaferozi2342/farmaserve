import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../../constants/Colors';

const ProviderStoriesScreen = ({ navigation }: any) => {
  const [stories, setStories] = useState([
    { id: '1', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', views: 45, timestamp: '2h ago' },
    { id: '2', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400', views: 32, timestamp: '5h ago' },
  ]);

  const handleUploadStory = () => {
    Alert.alert(
      'Upload Story',
      'Choose upload method',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera functionality will be implemented') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery picker will be implemented') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Stories</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Upload Card */}
        <TouchableOpacity style={styles.uploadCard} onPress={handleUploadStory} activeOpacity={0.8}>
          <LinearGradient colors={Gradients.primary} style={styles.uploadGradient} locations={[0, 1]}>
            <Ionicons name="add-circle" size={48} color={Colors.textWhite} />
            <Text style={styles.uploadTitle}>Create New Story</Text>
            <Text style={styles.uploadText}>Share your work with customers</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Active Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Stories (24h)</Text>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
              <View style={styles.storyInfo}>
                <View style={styles.storyStats}>
                  <Ionicons name="eye" size={16} color={Colors.textLight} />
                  <Text style={styles.storyStatText}>{story.views} views</Text>
                </View>
                <Text style={styles.storyTime}>{story.timestamp}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} activeOpacity={0.7}>
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Ionicons name="bulb" size={24} color={Colors.secondary} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Story Tips</Text>
            <Text style={styles.tipsText}>• Show your best work{'\n'}• Use good lighting{'\n'}• Add text or stickers{'\n'}• Post regularly</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  container: {
    flex: 1,
  },
  uploadCard: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  uploadGradient: {
    padding: 32,
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textWhite,
    marginTop: 16,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
  },
  storyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  storyStatText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  storyTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
  deleteButton: {
    padding: 8,
  },
  tipsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary + '20',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tipsContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 20,
  },
});

export default ProviderStoriesScreen;