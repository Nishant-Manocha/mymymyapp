import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';
import { Target, PiggyBank, TrendingUp, CircleAlert as AlertCircle, Award, Calendar, Percent } from 'lucide-react-native';
import { formatCurrency, SipInputs } from '../hooks/useSipCalculator';

interface ResultsCardProps {
  totalInvested: number;
  totalInterest: number;
  maturityValue: number;
  monthlyInvestment: number;
  isValid: boolean;
  inputs: SipInputs;
}

const { width } = Dimensions.get('window');

export const ResultsCard: React.FC<ResultsCardProps> = ({
  totalInvested,
  totalInterest,
  maturityValue,
  monthlyInvestment,
  isValid,
  inputs,
}) => {
  if (!isValid) {
    return (
      <View style={styles.invalidContainer}>
        <AlertCircle size={48} color="#f59e0b" />
        <Text style={styles.invalidTitle}>Invalid Inputs</Text>
        <Text style={styles.invalidSubtitle}>
          Please correct the errors above to see your SIP calculation results
        </Text>
      </View>
    );
  }

  const investmentPercentage = maturityValue > 0 ? (totalInvested / maturityValue) * 100 : 0;
  const returnsPercentage = 100 - investmentPercentage;
  const totalReturn = totalInterest > 0 ? ((totalInterest / totalInvested) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Hero Results Card */}
      <Animated.View 
        entering={FadeInRight.duration(600).springify()}
        style={styles.heroCard}
      >
        <View style={styles.heroHeader}>
          <View style={styles.heroIconContainer}>
            <Target size={24} color="#ffffff" />
          </View>
          <View style={styles.heroTitleContainer}>
            <Text style={styles.heroTitle}>Final Maturity Value</Text>
            <Text style={styles.heroSubtitle}>After {inputs.investmentDuration} years</Text>
          </View>
        </View>
        
        <Text style={styles.heroAmount}>{formatCurrency(maturityValue)}</Text>
        
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Percent size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.heroStatValue}>{totalReturn.toFixed(1)}%</Text>
            <Text style={styles.heroStatLabel}>Total Return</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Calendar size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.heroStatValue}>{inputs.investmentDuration}Y</Text>
            <Text style={styles.heroStatLabel}>Duration</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Award size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.heroStatValue}>{inputs.annualReturnRate}%</Text>
            <Text style={styles.heroStatLabel}>CAGR</Text>
          </View>
        </View>

        {/* Enhanced Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Investment Breakdown</Text>
            <Text style={styles.progressValue}>{returnsPercentage.toFixed(1)}% Returns</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                entering={FadeInLeft.delay(800).duration(1000)}
                style={[
                  styles.progressFill, 
                  { width: `${investmentPercentage}%` }
                ]} 
              />
              <Animated.View 
                entering={FadeInRight.delay(1000).duration(1000)}
                style={[
                  styles.progressFillReturns, 
                  { width: `${returnsPercentage}%` }
                ]} 
              />
            </View>
          </View>
          <View style={styles.progressLabels}>
            <View style={styles.progressLabelItem}>
              <View style={[styles.progressDot, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.progressLabel}>Your Investment</Text>
            </View>
            <View style={styles.progressLabelItem}>
              <View style={[styles.progressDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.progressLabel}>Market Returns</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Breakdown Cards */}
      <View style={styles.breakdownContainer}>
        <Animated.View 
          entering={FadeInLeft.delay(400).duration(600)}
          style={styles.breakdownCard}
        >
          <View style={styles.breakdownHeader}>
            <View style={[styles.breakdownIcon, { backgroundColor: '#dbeafe' }]}>
              <PiggyBank size={20} color="#3b82f6" />
            </View>
            <Text style={styles.breakdownLabel}>Total Invested</Text>
          </View>
          <Text style={styles.breakdownValue}>{formatCurrency(totalInvested)}</Text>
          <Text style={styles.breakdownSubtext}>
            ₹{monthlyInvestment.toLocaleString()} × {inputs.investmentDuration * 12} months
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInRight.delay(600).duration(600)}
          style={styles.breakdownCard}
        >
          <View style={styles.breakdownHeader}>
            <View style={[styles.breakdownIcon, { backgroundColor: '#dcfce7' }]}>
              <TrendingUp size={20} color="#10b981" />
            </View>
            <Text style={styles.breakdownLabel}>Wealth Generated</Text>
          </View>
          <Text style={[styles.breakdownValue, { color: '#10b981' }]}>
            {formatCurrency(totalInterest)}
          </Text>
          {totalInterest > totalInvested && (
            <View style={styles.gainContainer}>
              <View style={styles.gainBadge}>
                <Text style={styles.gainBadgeText}>
                  {((totalInterest / totalInvested) * 100).toFixed(0)}% Gain
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
      </View>

      {/* Investment Summary */}
      <Animated.View 
        entering={FadeInRight.delay(800).duration(600)}
        style={styles.summaryCard}
      >
        <Text style={styles.summaryTitle}>💡 Investment Insight</Text>
        <Text style={styles.summaryText}>
          Your disciplined monthly investment of{' '}
          <Text style={styles.summaryHighlight}>{formatCurrency(monthlyInvestment)}</Text>{' '}
          will compound over {inputs.investmentDuration} years to create{' '}
          <Text style={styles.summaryHighlight}>{formatCurrency(maturityValue)}</Text>{' '}
          in wealth, generating{' '}
          <Text style={styles.summaryHighlight}>{formatCurrency(totalInterest)}</Text>{' '}
          in returns through the power of compounding.
        </Text>
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            🚀 Pro Tip: Starting early and staying consistent are the keys to building substantial wealth through SIP investments.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  invalidContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  invalidTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  invalidSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  heroCard: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  heroTitleContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  heroAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -1,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
    marginBottom: 2,
  },
  heroStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  heroStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressFillReturns: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  breakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  breakdownCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  breakdownIcon: {
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    flex: 1,
  },
  breakdownValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  breakdownSubtext: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 16,
  },
  gainContainer: {
    marginTop: 8,
  },
  gainBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  gainBadgeText: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 16,
  },
  summaryHighlight: {
    fontWeight: '700',
    color: '#3b82f6',
  },
  tipContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
  },
  tipText: {
    fontSize: 12,
    color: '#0c4a6e',
    lineHeight: 18,
    fontWeight: '500',
  },
});