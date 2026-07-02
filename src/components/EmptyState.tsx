import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../context/ThemeContext';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon, title, description, buttonText, onPress,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container} accessibilityRole="summary" accessibilityLabel={`Empty state: ${title}. ${description}`}>
      <Ionicons name={icon} size={64} color={colors.placeholder} style={styles.icon} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.secondaryText }]}>{description}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={buttonText}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, marginTop: 40 },
  icon: { marginBottom: 16, opacity: 0.7 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  description: { fontSize: 14, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  button: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
