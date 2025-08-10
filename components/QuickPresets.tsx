import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Zap } from 'lucide-react-native';
import { SipInputs } from '../hooks/useSipCalculator';

interface QuickPresetsProps {
  onPresetSelect: (field: keyof SipInputs, value: number) => void;
}

const presets = [
  { label: 'Conservative', monthly: 2000, rate: 8, duration: 15, color: '#10b981' },
  { label: 'Moderate', monthly: 5000, rate: 12, duration: 10, color: '#3b82f6' },
  { label: 'Aggressive', monthly: 10000, rate: 15, duration: 20, color: '#f59e0b' },
  { label: 'Premium', monthly: 25000, rate: 18, duration: 25, color: '#8b5cf6' },
];

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onPresetSelect }) => {
  const handlePresetSelect = (preset: typeof presets[0]) => {
    onPresetSelect('monthlyInvestment', preset.monthly);
    onPresetSelect('annualReturnRate', preset.rate);
    onPresetSelect('investmentDuration', preset.duration);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Zap size={18} color="#1e40af" />
        <Text style={styles.headerText}>Quick Start Presets</Text>
      </View>
      
      <View style={styles.presetsGrid}>
        {presets.map((preset, index) => (
          <PresetCard
            key={preset.label}
            preset={preset}
            onPress={() => handlePresetSelect(preset)}
            delay={index * 100}
          />
        ))}
      </View>
    </View>
  );
};

interface PresetCardProps {
  preset: typeof presets[0];
  onPress: () => void;
  delay: number;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, onPress, delay }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.presetCard, animatedStyle]}>
      <TouchableOpacity
        style={[styles.presetButton, { borderColor: preset.color }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={[styles.presetIndicator, { backgroundColor: preset.color }]} />
        <Text style={styles.presetLabel}>{preset.label}</Text>
        <View style={styles.presetDetails}>
          <Text style={styles.presetAmount}>₹{preset.monthly.toLocaleString()}</Text>
          <Text style={styles.presetRate}>{preset.rate}% • {preset.duration}Y</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  presetCard: {
    width: '48%',
    marginBottom: 12,
  },
  presetButton: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  presetIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginBottom: 8,
  },
  presetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  presetDetails: {
    alignItems: 'center',
  },
  presetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  presetRate: {
    fontSize: 12,
    color: '#64748b',
  },
});