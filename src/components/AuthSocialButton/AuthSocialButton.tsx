import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

interface AuthSocialButtonProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon as any} size={20} color={Colors.text} />
      <Text style={styles.socialButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
});

export default AuthSocialButton;
