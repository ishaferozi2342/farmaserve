import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Gradients } from '../../constants/Colors';

const { width } = Dimensions.get('window');

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'refund';
  service: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const ProviderEarningsScreen = ({ navigation }: any) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const earningsData = {
    total: '$12,450',
    available: '$2,350',
    pending: '$450',
    withdrawn: '$9,650',
  };

  const periodData = {
    week: { earnings: '$450', jobs: '12', avgPerJob: '$37.50' },
    month: { earnings: '$2,350', jobs: '45', avgPerJob: '$52.22' },
    year: { earnings: '$12,450', jobs: '156', avgPerJob: '$79.81' },
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'earning',
      service: 'Premium Car Detailing',
      amount: '+$200',
      date: 'Nov 3, 2025',
      status: 'completed',
    },
    {
      id: '2',
      type: 'withdrawal',
      service: 'Bank Transfer',
      amount: '-$500',
      date: 'Nov 1, 2025',
      status: 'completed',
    },
    {
      id: '3',
      type: 'earning',
      service: 'Mobile Car Wash',
      amount: '+$60',
      date: 'Oct 31, 2025',
      status: 'pending',
    },
    {
      id: '4',
      type: 'earning',
      service: 'Interior Detailing',
      amount: '+$120',
      date: 'Oct 30, 2025',
      status: 'completed',
    },
    {
      id: '5',
      type: 'refund',
      service: 'Cancelled Service',
      amount: '-$80',
      date: 'Oct 28, 2025',
      status: 'completed',
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning': return 'arrow-down';
      case 'withdrawal': return 'arrow-up';
      case 'refund': return 'return-up-back';
      default: return 'cash';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earning': return Colors.success;
      case 'withdrawal': return Colors.primary;
      case 'refund': return Colors.error;
      default: return Colors.textLight;
    }
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
          <Text style={styles.headerTitle}>Earnings</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          {/* Balance Card */}
          <LinearGradient colors={Gradients.hero} style={styles.balanceCard} locations={[0, 1]}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{earningsData.available}</Text>
            <TouchableOpacity style={styles.withdrawButton}>
              <Ionicons name="wallet" size={20} color={Colors.primary} />
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Earnings Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="cash" size={24} color={Colors.success} />
              <Text style={styles.statValue}>{earningsData.total}</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color={Colors.warning} />
              <Text style={styles.statValue}>{earningsData.pending}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{earningsData.withdrawn}</Text>
              <Text style={styles.statLabel}>Withdrawn</Text>
            </View>
          </View>

          {/* Period Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Performance</Text>
            <View style={styles.periodSelector}>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.periodButtonTextActive]}>
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.periodButtonTextActive]}>
                  Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod('year')}
              >
                <Text style={[styles.periodButtonText, selectedPeriod === 'year' && styles.periodButtonTextActive]}>
                  Year
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.performanceCard}>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Earnings</Text>
                <Text style={styles.performanceValue}>{periodData[selectedPeriod].earnings}</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Jobs Completed</Text>
                <Text style={styles.performanceValue}>{periodData[selectedPeriod].jobs}</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Avg per Job</Text>
                <Text style={styles.performanceValue}>{periodData[selectedPeriod].avgPerJob}</Text>
              </View>
            </View>
          </View>

          {/* Transaction History */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Transaction History</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: getTransactionColor(transaction.type) + '20' }
                ]}>
                  <Ionicons
                    name={getTransactionIcon(transaction.type) as any}
                    size={20}
                    color={getTransactionColor(transaction.type)}
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionService}>{transaction.service}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    { color: transaction.type === 'earning' ? Colors.success : Colors.text }
                  ]}>
                    {transaction.amount}
                  </Text>
                  <View style={[
                    styles.transactionStatus,
                    { backgroundColor: transaction.status === 'completed' ? Colors.success + '20' : Colors.warning + '20' }
                  ]}>
                    <Text style={[
                      styles.transactionStatusText,
                      { color: transaction.status === 'completed' ? Colors.success : Colors.warning }
                    ]}>
                      {transaction.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Payout Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payout Methods</Text>
            <TouchableOpacity style={styles.payoutCard}>
              <View style={styles.payoutIcon}>
                <Ionicons name="card" size={24} color={Colors.primary} />
              </View>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutTitle}>Bank Account</Text>
                <Text style={styles.payoutDetail}>••••  ••••  ••••  4242</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addPayoutButton}>
              <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.addPayoutText}>Add Payout Method</Text>
            </TouchableOpacity>
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
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.textWhite,
    marginBottom: 20,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textLight,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
  periodButtonTextActive: {
    color: Colors.textWhite,
  },
  performanceCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionService: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  transactionStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  payoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  payoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  payoutInfo: {
    flex: 1,
  },
  payoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  payoutDetail: {
    fontSize: 14,
    color: Colors.textLight,
  },
  addPayoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.primary + '40',
    borderStyle: 'dashed',
  },
  addPayoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default ProviderEarningsScreen;