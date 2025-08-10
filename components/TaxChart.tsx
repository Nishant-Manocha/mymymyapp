import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

const RADIAN = Math.PI / 180;

interface TaxChartProps {
  taxBreakdownData?: Array<{ name: string; value: number; color: string }>;
  deductionsData?: Array<{ name: string; value: number; color: string }>;
  yearlyComparisonData?: Array<any>;
}

export const TaxChart: React.FC<TaxChartProps> = ({
  taxBreakdownData = [
    { name: 'Income Tax', value: 180000, color: '#0070ba' },
    { name: 'Health & Education Cess', value: 7200, color: '#003087' },
    { name: 'Net Income', value: 1012800, color: '#00a0e6' }
  ],
  deductionsData = [
    { name: '80C (EPF, ELSS)', value: 150000, color: '#0070ba' },
    { name: '80D (Health Ins.)', value: 25000, color: '#003087' },
    { name: 'Home Loan Interest', value: 200000, color: '#00a0e6' },
    { name: 'HRA', value: 240000, color: '#0099cc' },
    { name: 'Standard Deduction', value: 50000, color: '#66b3ff' }
  ],
  yearlyComparisonData = [
    { year: '2020-21', oldRegime: 195000, newRegime: 210000 },
    { year: '2021-22', oldRegime: 205000, newRegime: 215000 },
    { year: '2022-23', oldRegime: 165000, newRegime: 180000 },
    { year: '2023-24', oldRegime: 187200, newRegime: 198500 },
    { year: '2024-25', oldRegime: 187200, newRegime: 198500 }
  ]
}) => {
  const [activeTab, setActiveTab] = useState('breakdown');
  const screenWidth = Dimensions.get('window').width;

  const tabs = [
    { id: 'breakdown', label: 'Tax Breakdown' },
    { id: 'deductions', label: 'Deductions' },
    { id: 'comparison', label: 'Year Comparison' }
  ];

  // Convert data for react-native-chart-kit
  const pieChartData = taxBreakdownData.map((item, index) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const barChartData = {
    labels: deductionsData.map(item => item.name.substring(0, 8) + '...'),
    datasets: [{
      data: deductionsData.map(item => item.value)
    }]
  };

  const comparisonChartData = {
    labels: yearlyComparisonData.map(item => item.year),
    datasets: [
      {
        data: yearlyComparisonData.map(item => item.oldRegime),
        color: (opacity = 1) => `rgba(0, 112, 186, ${opacity})`,
      },
      {
        data: yearlyComparisonData.map(item => item.newRegime),
        color: (opacity = 1) => `rgba(0, 48, 135, ${opacity})`,
      }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'breakdown':
        return (
          <View style={styles.tabContent}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Tax Distribution</Text>
              <PieChart
                data={pieChartData}
                width={screenWidth - 100}
                height={200}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 112, 186, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={false}
                center={[0, 0]}
                style={{ alignSelf: 'center' }}
              />
              
              <View style={styles.legendContainer}>
                {taxBreakdownData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                    <Text style={styles.legendLabel}>{item.name}</Text>
                    <Text style={styles.legendValue}>₹{item.value.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Tax Summary</Text>
              <View style={styles.summaryContent}>
                {taxBreakdownData.map((item, index) => (
                  <View key={index} style={styles.summaryItem}>
                    <View style={styles.summaryItemLeft}>
                      <View style={[styles.summaryDot, { backgroundColor: item.color }]} />
                      <Text style={styles.summaryItemLabel}>{item.name}</Text>
                    </View>
                    <Text style={styles.summaryItemValue}>₹{item.value.toLocaleString()}</Text>
                  </View>
                ))}
                <View style={styles.summaryDivider} />
                <View style={styles.totalIncomeRow}>
                  <Text style={styles.totalIncomeLabel}>Total Annual Income:</Text>
                  <Text style={styles.totalIncomeValue}>
                    ₹{taxBreakdownData.find(item => item.name === 'Net Income')?.value.toLocaleString() || '0'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'deductions':
        return (
          <View style={styles.tabContent}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Available Deductions</Text>
              <BarChart
                data={barChartData}
                width={screenWidth - 100}
                height={250}
                yAxisLabel="₹"
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 112, 186, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForBackgroundLines: { strokeDasharray: '' },
                  barPercentage: 0.6,
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  alignSelf: 'center',
                }}
                showValuesOnTopOfBars
              />
              
              <View style={styles.deductionsSummary}>
                <View style={styles.deductionSummaryCard}>
                  <Text style={styles.deductionSummaryLabel}>Total Deductions</Text>
                  <Text style={styles.deductionSummaryValue}>
                    ₹{deductionsData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.deductionSummaryCard}>
                  <Text style={styles.deductionSummaryLabel}>Tax Savings</Text>
                  <Text style={styles.deductionSummaryValue}>—</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'comparison':
        return (
          <View style={styles.tabContent}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>5-Year Tax Comparison</Text>
              <BarChart
                data={comparisonChartData}
                width={screenWidth - 100}
                height={250}
                yAxisLabel="₹"
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 112, 186, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForBackgroundLines: { strokeDasharray: '' },
                  barPercentage: 0.6,
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  alignSelf: 'center',
                }}
                showValuesOnTopOfBars
              />
              
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#0070ba' }]} />
                  <Text style={styles.legendLabel}>Old Regime</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#003087' }]} />
                  <Text style={styles.legendLabel}>New Regime</Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#0070ba',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0070ba',
    marginBottom: 16,
    textAlign: 'center',
  },
  legendContainer: {
    width: '100%',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0070ba',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0070ba',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryContent: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  summaryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  summaryItemLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
  },
  summaryItemValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0070ba',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  totalIncomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalIncomeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalIncomeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0070ba',
  },
  deductionsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  deductionSummaryCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  deductionSummaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0070ba',
    marginBottom: 8,
  },
  deductionSummaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0070ba',
  },
});

export default TaxChart; 