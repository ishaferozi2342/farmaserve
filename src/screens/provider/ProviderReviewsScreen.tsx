import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

interface Review {
  id: string;
  customerName: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

const ProviderReviewsScreen = ({ navigation }: any) => {
  const overallRating = 4.9;
  const totalReviews = 127;

  const ratingBreakdown = [
    { stars: 5, count: 98, percentage: 77 },
    { stars: 4, count: 20, percentage: 16 },
    { stars: 3, count: 6, percentage: 5 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'John Doe',
      service: 'Premium Car Detailing',
      rating: 5,
      comment: 'Excellent service! My car looks brand new. Very professional and thorough work.',
      date: 'Nov 2, 2025',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      service: 'Mobile Car Wash',
      rating: 5,
      comment: 'Quick and efficient. Arrived on time and did a great job. Highly recommend!',
      date: 'Oct 30, 2025',
      response: 'Thank you for your kind words! Looking forward to serving you again.',
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      service: 'Interior Detailing',
      rating: 4,
      comment: 'Good service overall. Could have been a bit faster but quality was great.',
      date: 'Oct 28, 2025',
    },
    {
      id: '4',
      customerName: 'Sarah Williams',
      service: 'Premium Car Detailing',
      rating: 5,
      comment: 'Amazing attention to detail! Worth every penny. Will definitely book again.',
      date: 'Oct 25, 2025',
      response: 'Thank you so much! We appreciate your business.',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={Colors.secondary}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reviews & Ratings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          {/* Overall Rating Card */}
          <View style={styles.overallCard}>
            <View style={styles.overallLeft}>
              <Text style={styles.overallRating}>{overallRating}</Text>
              <View style={styles.overallStars}>
                {renderStars(Math.round(overallRating))}
              </View>
              <Text style={styles.overallCount}>{totalReviews} reviews</Text>
            </View>
            <View style={styles.overallRight}>
              {ratingBreakdown.map((item) => (
                <View key={item.stars} style={styles.ratingRow}>
                  <Text style={styles.ratingStars}>{item.stars}</Text>
                  <Ionicons name="star" size={12} color={Colors.secondary} />
                  <View style={styles.ratingBar}>
                    <View style={[styles.ratingBarFill, { width: `${item.percentage}%` }]} />
                  </View>
                  <Text style={styles.ratingCount}>{item.count}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.customerIcon}>
                    <Ionicons name="person" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.reviewInfo}>
                    <Text style={styles.customerName}>{review.customerName}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    {renderStars(review.rating)}
                  </View>
                </View>

                <Text style={styles.reviewService}>{review.service}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>

                {review.response ? (
                  <View style={styles.responseCard}>
                    <View style={styles.responseHeader}>
                      <Ionicons name="chatbubble" size={14} color={Colors.primary} />
                      <Text style={styles.responseLabel}>Your Response</Text>
                    </View>
                    <Text style={styles.responseText}>{review.response}</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.respondButton}>
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.primary} />
                    <Text style={styles.respondButtonText}>Respond</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {/* Tips Card */}
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={24} color={Colors.secondary} />
              <Text style={styles.tipsTitle}>Tips for Better Reviews</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.tipText}>Respond to reviews promptly</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.tipText}>Maintain high service quality</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.tipText}>Be professional and courteous</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.tipText}>Ask satisfied customers for reviews</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  overallCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overallLeft: {
    alignItems: 'center',
    paddingRight: 24,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  overallRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  overallStars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  overallCount: {
    fontSize: 12,
    color: Colors.textLight,
  },
  overallRight: {
    flex: 1,
    paddingLeft: 24,
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  ratingStars: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    width: 12,
  },
  ratingBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
  },
  ratingCount: {
    fontSize: 11,
    color: Colors.textLight,
    width: 24,
    textAlign: 'right',
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
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewService: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
    fontWeight: '500',
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  responseCard: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  responseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  responseText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },
  respondButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary + '20',
    paddingVertical: 10,
    borderRadius: 8,
  },
  respondButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  tipsCard: {
    backgroundColor: Colors.card,
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tipText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
});

export default ProviderReviewsScreen;