import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Calculator, CreditCard, TrendingUp, Sparkles, Repeat } from 'lucide-react-native';
import SimpleInterestCalculator from './SimpleInterestCalculator';
import LoanEmiCalculator from './LoanEmiCalculator';
import CompoundInterestCalculator from './CompoundInterestCalculator';

const CalculatorApp = () => {
  const [activeTab, setActiveTab] = useState('simple');

  const tabs = [
    { id: 'simple', label: 'Simple Interest', icon: TrendingUp },
    { id: 'emi', label: 'Loan EMI', icon: CreditCard },
    { id: 'compound', label: 'Compound Interest', icon: Repeat },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <Calculator size={32} color="#ffffff" />
              </View>
              <Text style={styles.title}>Financial Calculator</Text>
              <Sparkles size={24} color="#ffffff" opacity={0.8} />
            </View>
            <Text style={styles.subtitle}>
              Calculate Simple Interest, Loan EMI & Compound Interest with beautiful visualizations
            </Text>
          </View>
        </View>

        {/* Scrollable Tabs */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabWrapper}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                    onPress={() => setActiveTab(tab.id)}
                  >
                    <Icon size={20} color={activeTab === tab.id ? '#ffffff' : '#666666'} />
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab.id && styles.activeTabText,
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Calculator Content */}
        <View style={styles.content}>
          {activeTab === 'simple' && <SimpleInterestCalculator />}
          {activeTab === 'emi' && <LoanEmiCalculator />}
          {activeTab === 'compound' && <CompoundInterestCalculator />}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Calculator size={20} color="#3b82f6" />
            <Text style={styles.footerTitle}>Financial Calculator</Text>
          </View>
          <Text style={styles.footerSubtitle}>
            Built with PayPal-inspired design • Calculate with confidence
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: 320,
  },
  tabContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 16,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginTop: 64,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  footerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default CalculatorApp;
