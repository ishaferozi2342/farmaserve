import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

type HelpScreenProps = {
  navigation: HelpScreenNavigationProp;
};

interface HelpOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ navigation }) => {
  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@farmaserve.com');
  };

  const handleChat = () => {
    // Navigate to chat screen or open chat functionality
    console.log('Opening chat...');
  };

  const helpOptions: HelpOption[] = [
    {
      id: '1',
      title: 'Call Us',
      description: 'Speak with our support team',
      icon: 'call',
      color: Colors.primary,
      action: handleCall,
    },
    {
      id: '2',
      title: 'Email Support',
      description: 'Send us an email',
      icon: 'mail',
      color: Colors.secondary,
      action: handleEmail,
    },
    {
      id: '3',
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      icon: 'chatbubbles',
      color: Colors.success,
      action: handleChat,
    },
    {
      id: '4',
      title: 'Help Center',
      description: 'Browse our knowledge base',
      icon: 'book',
      color: Colors.info,
      action: () => console.log('Opening help center...'),
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I book a service?',
      answer: 'Browse services, select your preferred provider, choose a time slot, and confirm your booking. You\'ll receive instant confirmation.',
    },
    {
      id: '2',
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, digital wallets, and cash payments. All online payments are secure and encrypted.',
    },
    {
      id: '3',
      question: 'Can I cancel or reschedule a booking?',
      answer: 'Yes, you can cancel or reschedule up to 24 hours before the scheduled time without any charges.',
    },
    {
      id: '4',
      question: 'How are providers verified?',
      answer: 'All providers undergo background checks, skill verification, and must maintain a minimum 4.5-star rating.',
    },
    {
      id: '5',
      question: 'What if I\'m not satisfied with the service?',
      answer: 'We offer a satisfaction guarantee. Contact support within 24 hours, and we\'ll make it right or provide a full refund.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <LinearGradient colors={Gradients.primary} style={styles.hero} locations={[0, 1]}>
          <Ionicons name="help-circle" size={64} color={Colors.textWhite} />
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>
            Our support team is available 24/7 to assist you
          </Text>
        </LinearGradient>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.optionsGrid}>
            {helpOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionCard}
                onPress={option.action}
              >
                <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                  <Ionicons name={option.icon} size={28} color={option.color} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Ionicons name="document-text" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Report an Issue</Text>
              <Text style={styles.actionDescription}>
                Let us know if something went wrong
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Ionicons name="star" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Rate Your Experience</Text>
              <Text style={styles.actionDescription}>
                Share your feedback with us
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Ionicons name="shield-checkmark" size={24} color={Colors.success} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Safety Guidelines</Text>
              <Text style={styles.actionDescription}>
                Learn about our safety measures
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <View style={styles.emergencyCard}>
            <LinearGradient colors={Gradients.error} style={styles.emergencyGradient} locations={[0, 1]}>
              <Ionicons name="warning" size={32} color={Colors.textWhite} />
              <Text style={styles.emergencyTitle}>Emergency Support</Text>
              <Text style={styles.emergencyText}>
                For urgent issues, call our 24/7 hotline
              </Text>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={handleCall}
              >
                <Ionicons name="call" size={20} color={Colors.error} />
                <Text style={styles.emergencyButtonText}>Call Now</Text>
              </TouchableOpacity>
            </LinearGradient>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundLight,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  hero: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.textWhite,
    opacity: 0.9,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: Colors.textLight,
  },
  faqCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  emergencyCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  emergencyGradient: {
    padding: 24,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginTop: 12,
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
});

export default HelpScreen;