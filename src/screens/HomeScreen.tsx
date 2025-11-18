import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../constants/Colors';
import { serviceCategories, featuredServices, topProviders } from '../constants/Data';
import ServiceCard from '../components/ServiceCard';
import CategoryCard from '../components/CategoryCard';
import ProviderCard from '../components/ProviderCard';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
      <LinearGradient colors={Gradients.hero} style={styles.hero} locations={[0, 1]}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find the Perfect</Text>
          <Text style={styles.heroTitle}>Service Provider</Text>
          <Text style={styles.heroTitle}>Near You</Text>
          <Text style={styles.heroSubtitle}>
            Connect with skilled professionals for auto care, home services, beauty, and more.
          </Text>
          <Text style={styles.heroSubtitle}>Quality service, verified providers, guaranteed satisfaction.</Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Main', { screen: 'Services' })}
            >
              <Text style={styles.primaryButtonText}>Browse Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Signup', { userType: 'provider' })}
            >
              <Text style={styles.secondaryButtonText}>Become a Provider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3,500+</Text>
          <Text style={styles.statLabel}>Active Users</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1,750+</Text>
          <Text style={styles.statLabel}>Providers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>17,500+</Text>
          <Text style={styles.statLabel}>Jobs Done</Text>
        </View>
      </View>

      <View style={styles.trustBadges}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={32} color={Colors.primary} />
          <Text style={styles.badgeTitle}>Verified Providers</Text>
          <Text style={styles.badgeText}>All professionals are background-checked</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="star" size={32} color={Colors.primary} />
          <Text style={styles.badgeTitle}>Top Rated</Text>
          <Text style={styles.badgeText}>Only 4.5+ star rated professionals</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={32} color={Colors.primary} />
          <Text style={styles.badgeTitle}>Quality Guaranteed</Text>
          <Text style={styles.badgeText}>Satisfaction guaranteed or money back</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="people" size={32} color={Colors.primary} />
          <Text style={styles.badgeTitle}>Trusted Community</Text>
          <Text style={styles.badgeText}>10,000+ happy customers served</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Services</Text>
        <Text style={styles.sectionSubtitle}>Browse through our wide range of professional services</Text>
        
        <View style={styles.categoriesGrid}>
          {serviceCategories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              onPress={() => navigation.navigate('Main', { 
                screen: 'Services', 
                params: { categoryId: category.id } 
              })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Services' })}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>Top-rated professionals ready to help</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet Our Top Providers</Text>
        <Text style={styles.sectionSubtitle}>Experienced professionals ready to serve you</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {topProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>Get started in four simple steps</Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Browse Services</Text>
            <Text style={styles.stepText}>
              Explore our wide range of professional services across multiple categories
            </Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Choose Provider</Text>
            <Text style={styles.stepText}>
              Select from verified professionals with ratings and reviews
            </Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Book & Schedule</Text>
            <Text style={styles.stepText}>
              Pick a convenient time and confirm your booking instantly
            </Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Rate Experience</Text>
            <Text style={styles.stepText}>
              Share your feedback and help others make informed decisions
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 FarmaServe. All rights reserved.</Text>
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
  hero: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.textWhite,
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.9,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    marginTop: 32,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 12,
  },
  primaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: Colors.backgroundLight,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  trustBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  badge: {
    width: '50%',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
  },
  viewAll: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    marginTop: 8,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  stepsContainer: {
    marginTop: 16,
  },
  step: {
    marginBottom: 32,
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});

export default HomeScreen;