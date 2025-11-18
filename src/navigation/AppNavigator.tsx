import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  ActivityIndicator, 
  View, 
  StyleSheet, 
  Platform, 
  StatusBar,
  KeyboardAvoidingView 
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, MainTabParamList, ProviderTabParamList } from '../types';
import { useAuth } from '../context/AuthContext';

// Colors
const Colors = {
  primary: '#6366f1',
  textLight: '#64748b',
  card: '#ffffff',
  background: '#f8fafc',
};

// Mock Screens (tumhara actual screens use karo)
const LoginScreen = () => <View><ActivityIndicator /></View>;
const SignupScreen = () => <View><ActivityIndicator /></View>;
const HomeScreen = () => <View><ActivityIndicator /></View>;
const DashboardScreen = () => <View><ActivityIndicator /></View>;
const ServicesScreen = () => <View><ActivityIndicator /></View>;
const BookingsScreen = () => <View><ActivityIndicator /></View>;
const ProfileScreen = () => <View><ActivityIndicator /></View>;
const ServiceDetailScreen = () => <View><ActivityIndicator /></View>;
const ProviderDetailScreen = () => <View><ActivityIndicator /></View>;
const BookingConfirmationScreen = () => <View><ActivityIndicator /></View>;
const ProviderDashboardScreen = () => <View><ActivityIndicator /></View>;
const ProviderServicesScreen = () => <View><ActivityIndicator /></View>;
const ProviderBookingsScreen = () => <View><ActivityIndicator /></View>;
const ProviderEarningsScreen = () => <View><ActivityIndicator /></View>;
const ProviderReviewsScreen = () => <View><ActivityIndicator /></View>;
const ProviderProfileScreen = () => <View><ActivityIndicator /></View>;
const ProviderStoriesScreen = () => <View><ActivityIndicator /></View>;
const ProviderReelsScreen = () => <View><ActivityIndicator /></View>;
const ProviderVideosScreen = () => <View><ActivityIndicator /></View>;
const NotificationsScreen = () => <View><ActivityIndicator /></View>;
const HelpScreen = () => <View><ActivityIndicator /></View>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const ProviderTab = createBottomTabNavigator<ProviderTabParamList>();

// Custom Tab Bar Container
const TabContainer = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.container,
      {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
        paddingBottom: insets.bottom
      }
    ]}>
      {children}
    </View>
  );
};

const MainTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <TabContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'apps' : 'apps-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (route.name === 'Services') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textLight,
          tabBarStyle: {
            position: 'relative',
            borderTopWidth: 0,
            backgroundColor: Colors.card,
            height: 60 + Math.max(insets.bottom, 8),
            paddingBottom: Math.max(insets.bottom, 8),
            paddingTop: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          },
          tabBarHideOnKeyboard: true,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Tab.Screen name="Explore" component={HomeScreen} options={{ title: 'Explore' }} />
        <Tab.Screen name="Services" component={ServicesScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </TabContainer>
  );
};

const ProviderTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <TabContainer>
      <ProviderTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home';

            if (route.name === 'ProviderDashboard') {
              iconName = focused ? 'apps' : 'apps-outline';
            } else if (route.name === 'ProviderBookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'ProviderEarnings') {
              iconName = focused ? 'trending-up' : 'trending-up-outline';
            } else if (route.name === 'ProviderReviews') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'ProviderProfile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textLight,
          tabBarStyle: {
            position: 'relative',
            borderTopWidth: 0,
            backgroundColor: Colors.card,
            height: 60 + Math.max(insets.bottom, 8),
            paddingBottom: Math.max(insets.bottom, 8),
            paddingTop: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          },
          tabBarHideOnKeyboard: true,
          headerShown: false,
        })}
      >
        <ProviderTab.Screen name="ProviderDashboard" component={ProviderDashboardScreen} options={{ title: 'Dashboard' }} />
        <ProviderTab.Screen name="ProviderBookings" component={ProviderBookingsScreen} options={{ title: 'Bookings' }} />
        <ProviderTab.Screen name="ProviderEarnings" component={ProviderEarningsScreen} options={{ title: 'Earnings' }} />
        <ProviderTab.Screen name="ProviderReviews" component={ProviderReviewsScreen} options={{ title: 'Reviews' }} />
        <ProviderTab.Screen name="ProviderProfile" component={ProviderProfileScreen} options={{ title: 'Profile' }} />
      </ProviderTab.Navigator>
    </TabContainer>
  );
};

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              cardStyle: { backgroundColor: Colors.background }
            }}
          >
            {user ? (
              user.userType === 'provider' ? (
                <>
                  <Stack.Screen name="ProviderMain" component={ProviderTabs} />
                  <Stack.Screen name="ProviderServices" component={ProviderServicesScreen} />
                  <Stack.Screen name="ProviderStories" component={ProviderStoriesScreen} />
                  <Stack.Screen name="ProviderReels" component={ProviderReelsScreen} />
                  <Stack.Screen name="ProviderVideos" component={ProviderVideosScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Main" component={MainTabs} />
                  <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
                  <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
                  <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
                  <Stack.Screen name="Notifications" component={NotificationsScreen} />
                  <Stack.Screen name="Help" component={HelpScreen} />
                </>
              )
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default AppNavigator;