import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
  containerStyle,
  titleStyle,
}) => {
  return (
    <View style={[styles.sectionHeader, containerStyle]}>
      <Text style={[styles.sectionTitle, titleStyle]}>{title}</Text>
      {actionLabel && onActionPress ? (
        <Text style={styles.viewAll} onPress={onActionPress}>
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default SectionHeader;
