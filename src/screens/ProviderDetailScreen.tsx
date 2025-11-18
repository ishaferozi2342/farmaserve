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
import { featuredServices } from '../constants/Data';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type ProviderDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProviderDetail'>;
type ProviderDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProviderDetail'>;

type ProviderDetailScreenProps = {
  navigation: ProviderDetailScreenNavigationProp;
  route: ProviderDetailScreenRouteProp;
};

const ProviderDetailScreen: React.FC<ProviderDetailScreenProps> = ({ navigation, route }) => {
  const { provider } = route.params;
  const [activeTab, setActiveTab] = useState<'gallery' | 'services' | 'reviews'>('gallery');
  const providerServices = featuredServices.filter(
    s => s.category.toLowerCase() === provider.category.toLowerCase()
  );

  const reviews = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! Very professional and thorough.',
      date: '2 days ago',
    },
    {
      id: '2',
      name: 'Mike Chen',
      rating: 5,
      comment: 'Great experience. Highly recommend!',
      date: '1 week ago',
    },
    {
      id: '3',
      name: 'Emily Davis',
      rating: 4,
      comment: 'Good service, arrived on time and did quality work.',
      date: '2 weeks ago',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        nestedScrollEnabled
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: provider.image }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{provider.name}</Text>
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.verifiedBadge} />
              </View>
              <Text style={styles.category}>{provider.category}</Text>
              <View style={styles.infoRow}>
                <Ionicons name="star" size={16} color={Colors.star} />
                <Text style={styles.infoText}>{provider.rating} (118 reviews)</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="briefcase" size={16} color={Colors.primary} />
                <Text style={styles.infoText}>{provider.jobsCompleted} jobs completed</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color={Colors.textLight} />
                <Text style={styles.infoText}>Boston, MA</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={16} color={Colors.textLight} />
                <Text style={styles.infoText}>Member since 17/05/2020</Text>
              </View>
            </View>
          </View>

          <View style={styles.skillsSection}>
            <Text style={styles.skillsSectionTitle}>Skills & Expertise</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillBadge}>
                <Text style={styles.skillText}>Computer Repair</Text>
              </View>
              <View style={styles.skillBadge}>
                <Text style={styles.skillText}>Network Setup</Text>
              </View>
              <View style={styles.skillBadge}>
                <Text style={styles.skillText}>Data Recovery</Text>
              </View>
              <View style={styles.skillBadge}>
                <Text style={styles.skillText}>Software Installation</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.contactButtonMain}>
              <LinearGradient colors={Gradients.primary} style={styles.contactButtonGradient} locations={[0, 1]}>
                <Ionicons name="chatbubble" size={18} color={Colors.textWhite} />
                <Text style={styles.contactButtonText}>Contact</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'gallery' && styles.tabActive]}
            onPress={() => setActiveTab('gallery')}
          >
            <Text style={[styles.tabText, activeTab === 'gallery' && styles.tabTextActive]}>
              Work Gallery ({providerServices.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'services' && styles.tabActive]}
            onPress={() => setActiveTab('services')}
          >
            <Text style={[styles.tabText, activeTab === 'services' && styles.tabTextActive]}>
              Services ({providerServices.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.tabTextActive]}>
              Reviews (1)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'gallery' && (
            providerServices.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="images-outline" size={64} color={Colors.textLight} />
                <Text style={styles.emptyStateText}>No work gallery items yet</Text>
              </View>
            ) : (
              <View style={styles.galleryGrid}>
                {providerServices.map(item => (
                  <Image key={item.id} source={{ uri: item.image }} style={styles.galleryImage} />
                ))}
              </View>
            )
          )}

          {activeTab === 'services' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>
                  Professional {provider.category} specialist with over 5 years of experience. 
                  Committed to providing high-quality service and ensuring customer satisfaction. 
                  Background-checked and fully insured.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                <View style={styles.certItem}>
                  <Ionicons name="ribbon" size={24} color={Colors.primary} />
                  <View style={styles.certInfo}>
                    <Text style={styles.certTitle}>Professional Certification</Text>
                    <Text style={styles.certSubtitle}>Verified by FarmaServe</Text>
                  </View>
                </View>
                <View style={styles.certItem}>
                  <Ionicons name="shield-checkmark" size={24} color={Colors.success} />
                  <View style={styles.certInfo}>
                    <Text style={styles.certTitle}>Background Check</Text>
                    <Text style={styles.certSubtitle}>Completed & Verified</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Ionicons key={i} name="star" size={14} color={Colors.star} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton}>
          <LinearGradient colors={Gradients.primary} style={styles.contactButtonGradient} locations={[0, 1]}>
            <Ionicons name="chatbubble-outline" size={20} color={Colors.textWhite} />
            <Text style={styles.contactButtonText}>Contact Provider</Text>
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
    paddingBottom: 120,
    flexGrow: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  verifiedBadge: {
    marginLeft: 6,
  },
  category: {
    fontSize: 15,
    color: Colors.textLight,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textWhite,
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  skillBadge: {
    backgroundColor: Colors.primaryLight + '20',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
  },
  skillText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  certInfo: {
    marginLeft: 16,
    flex: 1,
  },
  certTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  certSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  reviewCard: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  contactButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: Colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  skillsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
  },
  skillsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  contactButtonMain: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  galleryImage: {
    width: (width - 40 - 12) / 2, // account for horizontal padding and gap
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: Colors.backgroundLight,
  },
});

export default ProviderDetailScreen;
