import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

export type AuthUserType = 'customer' | 'provider';

interface AuthUserTypeToggleProps {
  value: AuthUserType;
  onChange: (next: AuthUserType) => void;
}

const AuthUserTypeToggle: React.FC<AuthUserTypeToggleProps> = ({ value, onChange }) => {
  return (
    <View style={styles.userTypeContainer}>
      <TouchableOpacity
        style={[styles.userTypeButton, value === 'customer' && styles.userTypeButtonActive]}
        onPress={() => onChange('customer')}
      >
        <Ionicons
          name="person"
          size={20}
          color={value === 'customer' ? Colors.textWhite : Colors.textLight}
        />
        <Text style={[styles.userTypeText, value === 'customer' && styles.userTypeTextActive]}>
          Customer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.userTypeButton, value === 'provider' && styles.userTypeButtonActive]}
        onPress={() => onChange('provider')}
      >
        <Ionicons
          name="briefcase"
          size={20}
          color={value === 'provider' ? Colors.textWhite : Colors.textLight}
        />
        <Text style={[styles.userTypeText, value === 'provider' && styles.userTypeTextActive]}>
          Provider
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  userTypeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  userTypeText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textLight,
  },
  userTypeTextActive: {
    color: Colors.textWhite,
  },
});

export default AuthUserTypeToggle;
