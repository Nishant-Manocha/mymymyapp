import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
// Chart imports
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import TaxChart from './TaxChart';

interface TaxCalculation {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  incomeTax: number;
  cess: number;
  totalTax: number;
  netIncome: number;
}

interface TaxCalculatorProps {
  onTaxDataChange?: (data: any) => void;
  income: string;
  setIncome: (val: string) => void;
  employmentType: string;
  setEmploymentType: (val: string) => void;
  ageGroup: string;
  setAgeGroup: (val: string) => void;
  deductions80C: number;
  setDeductions80C: (val: number) => void;
  deductions80D: number;
  setDeductions80D: (val: number) => void;
  hraExemption: number;
  setHraExemption: (val: number) => void;
  homeLoanInterest: number;
  setHomeLoanInterest: (val: number) => void;
  educationLoanInterest: number;
  setEducationLoanInterest: (val: number) => void;
  nps: number;
  setNps: (val: number) => void;
  deductions80G: number;
  setDeductions80G: (val: number) => void;
  regime: string;
  setRegime: (val: string) => void;
  taxResult: any;
  setTaxResult: (val: any) => void;
  isCalculated: boolean;
  setIsCalculated: (val: boolean) => void;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({
  onTaxDataChange,
  income,
  setIncome,
  employmentType,
  setEmploymentType,
  ageGroup,
  setAgeGroup,
  deductions80C,
  setDeductions80C,
  deductions80D,
  setDeductions80D,
  hraExemption,
  setHraExemption,
  homeLoanInterest,
  setHomeLoanInterest,
  educationLoanInterest,
  setEducationLoanInterest,
  nps,
  setNps,
  deductions80G,
  setDeductions80G,
  regime,
  setRegime,
  taxResult,
  setTaxResult,
  isCalculated,
  setIsCalculated,
}) => {
  // State for tracking the active tab in the results section
  const [activeResultTab, setActiveResultTab] = useState<string>('taxBreakdown');
  const getAgeFromGroup = (ageGroup: string): number => {
    switch (ageGroup) {
      case "below60": return 30;
      case "60to80": return 65;
      case "above80": return 85;
      default: return 30;
    }
  };

  const calculateOldRegime = (annualIncome: number, userAge: number): TaxCalculation => {
    const standardDeduction = employmentType === "salaried" ? 50000 : 0;
    const totalDeductions = Math.min(deductions80C, 150000) + 
                           Math.min(deductions80D, userAge >= 60 ? 50000 : 25000) + 
                           Math.min(homeLoanInterest, 200000) + 
                           Math.min(hraExemption, annualIncome * 0.5) +
                           educationLoanInterest +
                           Math.min(nps, annualIncome * 0.1) +
                           deductions80G +
                           standardDeduction;

    const taxableIncome = Math.max(0, annualIncome - totalDeductions);
    
    let exemptionLimit = 250000;
    if (userAge >= 80) exemptionLimit = 500000;
    else if (userAge >= 60) exemptionLimit = 300000;
    
    let tax = 0;
    if (taxableIncome > exemptionLimit) {
      tax += Math.min(taxableIncome - exemptionLimit, 500000 - exemptionLimit) * 0.05;
    }
    if (taxableIncome > 500000) {
      tax += Math.min(taxableIncome - 500000, 500000) * 0.2;
    }
    if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.3;
    }
    
    if (taxableIncome <= 500000) {
      tax = Math.max(0, tax - 12500);
    }
    
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    
    return {
      grossIncome: annualIncome,
      totalDeductions,
      taxableIncome,
      incomeTax: tax,
      cess,
      totalTax,
      netIncome: annualIncome - totalTax
    };
  };

  const calculateNewRegime = (annualIncome: number): TaxCalculation => {
    const standardDeduction = 50000;
    const taxableIncome = Math.max(0, annualIncome - standardDeduction);
    
    let tax = 0;
    if (taxableIncome > 300000) {
      tax += Math.min(taxableIncome - 300000, 300000) * 0.05;
    }
    if (taxableIncome > 600000) {
      tax += Math.min(taxableIncome - 600000, 300000) * 0.1;
    }
    if (taxableIncome > 900000) {
      tax += Math.min(taxableIncome - 900000, 300000) * 0.15;
    }
    if (taxableIncome > 1200000) {
      tax += Math.min(taxableIncome - 1200000, 300000) * 0.2;
    }
    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.3;
    }
    
    if (taxableIncome <= 700000) {
      tax = Math.max(0, tax - 25000);
    }
    
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    
    return {
      grossIncome: annualIncome,
      totalDeductions: standardDeduction,
      taxableIncome,
      incomeTax: tax,
      cess,
      totalTax,
      netIncome: annualIncome - totalTax
    };
  };

  const handleCalculate = () => {
    const annualIncome = Number(income) || 0;
    const userAge = getAgeFromGroup(ageGroup);

    if (annualIncome <= 0) {
      Alert.alert("Error", "Please enter a valid annual income");
      return;
    }

    const oldRegimeCalc = calculateOldRegime(annualIncome, userAge);
    const newRegimeCalc = calculateNewRegime(annualIncome);
    const savings = oldRegimeCalc.totalTax - newRegimeCalc.totalTax;
    let recommendedRegime = 'New Regime';
    if (oldRegimeCalc.totalTax < newRegimeCalc.totalTax) {
      recommendedRegime = 'Old Regime';
    }

    const result = {
      old: oldRegimeCalc,
      new: newRegimeCalc,
      savings,
      recommendedRegime
    };

    setTaxResult(result);
    setIsCalculated(true);
    // Set the initial view to comparison when calculation is done
    setRegime('comparison');

    if (onTaxDataChange) {
      onTaxDataChange({
        income: annualIncome,
        deductions: {
          section80C: deductions80C,
          section80D: deductions80D,
          hraExemption: hraExemption,
          homeLoanInterest: homeLoanInterest,
          educationLoanInterest: educationLoanInterest,
          nps: nps,
          section80G: deductions80G,
          standardDeduction: 50000
        },
        ageGroup,
        regime,
        oldRegimeTax: oldRegimeCalc.totalTax,
        newRegimeTax: newRegimeCalc.totalTax,
        recommendation: recommendedRegime,
        savings
      });
    }
  };

  const handleReset = () => {
    setIncome("");
    setEmploymentType("salaried");
    setAgeGroup("below60");
    setDeductions80C(0);
    setDeductions80D(0);
    setHraExemption(0);
    setHomeLoanInterest(0);
    setEducationLoanInterest(0);
    setNps(0);
    setDeductions80G(0);
    setRegime("new");
    setTaxResult(null);
    setIsCalculated(false);
    if (onTaxDataChange) {
      onTaxDataChange(null);
    }
  };

  // Chart data for bar graph
  const chartWidth = Dimensions.get('window').width - 100;
  const chartData = isCalculated && taxResult ? {
    labels: ['Old Regime', 'New Regime'],
    datasets: [
      {
        data: [taxResult.old.totalTax, taxResult.new.totalTax],
      },
    ],
  } : {
    labels: ['Old Regime', 'New Regime'],
    datasets: [
      { data: [0, 0] }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tax Calculator</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Annual Income (₹)</Text>
          <TextInput
            style={styles.inputLarge}
            value={income}
            onChangeText={setIncome}
            placeholder="Enter your annual income"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Employment Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={employmentType}
              onValueChange={setEmploymentType}
              style={styles.picker}
            >
              <Picker.Item label="Salaried (Employed)" value="salaried" />
              <Picker.Item label="Self-Employed" value="self-employed" />
              <Picker.Item label="Business Owner" value="business" />
              <Picker.Item label="Freelancer" value="freelancer" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age Group</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={ageGroup}
              onValueChange={setAgeGroup}
              style={styles.picker}
            >
              <Picker.Item label="Below 60 years" value="below60" />
              <Picker.Item label="60-80 years (Senior Citizen)" value="60to80" />
              <Picker.Item label="Above 80 years (Very Senior)" value="above80" />
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.halfInput, styles.leftInput]}>
            <Text style={styles.label}>80C Investments (₹)</Text>
            <TextInput
              style={styles.input}
              value={deductions80C.toString()}
              onChangeText={(text) => setDeductions80C(Number(text) || 0)}
              placeholder="Max ₹1,50,000"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>80D Health Insurance (₹)</Text>
            <TextInput
              style={styles.input}
              value={deductions80D.toString()}
              onChangeText={(text) => setDeductions80D(Number(text) || 0)}
              placeholder="Max ₹25,000"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.halfInput, styles.leftInput]}>
            <Text style={styles.label}>HRA Exemption (₹)</Text>
            <TextInput
              style={styles.input}
              value={hraExemption.toString()}
              onChangeText={(text) => setHraExemption(Number(text) || 0)}
              placeholder="House Rent Allowance"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Home Loan Interest (₹)</Text>
            <TextInput
              style={styles.input}
              value={homeLoanInterest.toString()}
              onChangeText={(text) => setHomeLoanInterest(Number(text) || 0)}
              placeholder="Max ₹2,00,000"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.halfInput, styles.leftInput]}>
            <Text style={styles.label}>Education Loan Interest (₹)</Text>
            <TextInput
              style={styles.input}
              value={educationLoanInterest.toString()}
              onChangeText={(text) => setEducationLoanInterest(Number(text) || 0)}
              placeholder="No limit (Section 80E)"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>80G Donations (₹)</Text>
            <TextInput
              style={styles.input}
              value={deductions80G.toString()}
              onChangeText={(text) => setDeductions80G(Number(text) || 0)}
              placeholder="Charitable donations"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleCalculate}>
            <Text style={styles.primaryButtonText}>Calculate Tax</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
            <Text style={styles.secondaryButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Bar Graph Comparison */}
        {isCalculated && taxResult && (
          <View style={{ marginTop: 24, marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3b82f6', textAlign: 'center', marginBottom: 8 }}>
              Tax Comparison (Bar Graph)
            </Text>
            <BarChart
              data={chartData}
              width={chartWidth}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              fromZero
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 112, 186, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
                style: { borderRadius: 16 },
                propsForBackgroundLines: { strokeDasharray: '' },
                barPercentage: 0.5,
              }}
              style={{ 
                borderRadius: 16,
                marginHorizontal: 16,
                alignSelf: 'center'
              }}
              showValuesOnTopOfBars
            />
          </View>
        )}

        {isCalculated && taxResult && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Tax Calculation Results</Text>
            
            {/* Tab Navigation for Results */}
            <View style={styles.resultsTabContainer}>
              <TouchableOpacity 
                style={[styles.resultsTabButton, activeResultTab === 'taxBreakdown' ? styles.resultsActiveTab : {}]}
                onPress={() => setActiveResultTab('taxBreakdown')}
              >
                <Text style={[styles.resultsTabText, activeResultTab === 'taxBreakdown' ? styles.resultsActiveTabText : {}]}>Tax Breakdown</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.resultsTabButton, activeResultTab === 'deductions' ? styles.resultsActiveTab : {}]}
                onPress={() => setActiveResultTab('deductions')}
              >
                <Text style={[styles.resultsTabText, activeResultTab === 'deductions' ? styles.resultsActiveTabText : {}]}>Deductions</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.resultsTabButton, activeResultTab === 'yearComparison' ? styles.resultsActiveTab : {}]}
                onPress={() => setActiveResultTab('yearComparison')}
              >
                <Text style={[styles.resultsTabText, activeResultTab === 'yearComparison' ? styles.resultsActiveTabText : {}]}>Year Comparison</Text>
              </TouchableOpacity>
            </View>
            
            {/* Tax Breakdown Tab */}
            {activeResultTab === 'taxBreakdown' && (
              <>
                {/* Regime Selection */}
                <View style={styles.regimeTabContainer}>
                  <TouchableOpacity 
                    style={[styles.regimeTabButton, regime === 'old' ? styles.activeRegimeTab : {}]}
                    onPress={() => setRegime('old')}
                  >
                    <Text style={[styles.regimeTabText, regime === 'old' ? styles.activeRegimeTabText : {}]}>Old Regime</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.regimeTabButton, regime === 'new' ? styles.activeRegimeTab : {}]}
                    onPress={() => setRegime('new')}
                  >
                    <Text style={[styles.regimeTabText, regime === 'new' ? styles.activeRegimeTabText : {}]}>New Regime</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.regimeTabButton, regime === 'comparison' ? styles.activeRegimeTab : {}]}
                    onPress={() => setRegime('comparison')}
                  >
                    <Text style={[styles.regimeTabText, regime === 'comparison' ? styles.activeRegimeTabText : {}]}>Comparison</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Tax Distribution and Summary */}
                {regime !== 'comparison' && (
                  <View style={styles.taxDistributionFullContainer}>
                    <Text style={styles.sectionTitle}>Tax Distribution</Text>
                    
                    {/* Pie Chart */}
                    <PieChart
                      data={[
                        {
                          name: 'Income Tax',
                          population: regime === 'old' ? taxResult.old.incomeTax : taxResult.new.incomeTax,
                          color: '#0070ba',
                          legendFontColor: '#7F7F7F',
                          legendFontSize: 12,
                        },
                        {
                          name: 'Cess',
                          population: regime === 'old' ? taxResult.old.cess : taxResult.new.cess,
                          color: '#00a0e9',
                          legendFontColor: '#7F7F7F',
                          legendFontSize: 12,
                        },
                      ]}
                      width={Dimensions.get('window').width - 100}
                      height={180}
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
                    
                    <View style={styles.chartSummaryContainer}>
                      <View style={styles.summaryItem}>
                        <View style={styles.summaryDot} />
                        <Text style={styles.summaryLabel}>Income Tax</Text>
                        <Text style={styles.summaryValue}>
                          ₹{(regime === 'old' ? taxResult.old.incomeTax : taxResult.new.incomeTax).toLocaleString()}
                        </Text>
                      </View>
                      
                      <View style={styles.summaryItem}>
                        <View style={[styles.summaryDot, styles.cessDot]} />
                        <Text style={styles.summaryLabel}>Health & Education Cess</Text>
                        <Text style={styles.summaryValue}>
                          ₹{(regime === 'old' ? taxResult.old.cess : taxResult.new.cess).toLocaleString()}
                        </Text>
                      </View>
                      
                      <View style={styles.summaryItem}>
                        <View style={[styles.summaryDot, styles.netIncomeDot]} />
                        <Text style={styles.summaryLabel}>Net Income</Text>
                        <Text style={styles.summaryValue}>
                          ₹{(regime === 'old' ? taxResult.old.netIncome : taxResult.new.netIncome).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                
                {/* Old Regime Breakdown */}
                {regime === 'old' && (
                  <View style={styles.breakdownContainer}>
                    <Text style={styles.breakdownTitle}>Old Regime Breakdown</Text>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Gross Income:</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.old.grossIncome.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Total Deductions:</Text>
                      <Text style={[styles.breakdownValue, styles.deductionText]}>-₹{taxResult.old.totalDeductions.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownDivider} />
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Taxable Income:</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.old.taxableIncome.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Income Tax:</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.old.incomeTax.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Health & Education Cess (4%):</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.old.cess.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownDivider} />
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabelBold}>Total Tax:</Text>
                      <Text style={styles.breakdownValueBold}>₹{taxResult.old.totalTax.toLocaleString()}</Text>
                    </View>
                  </View>
                )}
                
                {/* New Regime Breakdown */}
                {regime === 'new' && (
                  <View style={styles.breakdownContainer}>
                    <Text style={styles.breakdownTitle}>New Regime Breakdown</Text>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Gross Income:</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.new.grossIncome.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Standard Deduction:</Text>
                      <Text style={[styles.breakdownValue, styles.deductionText]}>-₹{taxResult.new.totalDeductions.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownDivider} />
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Taxable Income:</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.new.taxableIncome.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Income Tax:</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.new.incomeTax.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Health & Education Cess (4%):</Text>
                      <Text style={styles.breakdownValue}>₹{taxResult.new.cess.toLocaleString()}</Text>
                    </View>
                    
                    <View style={styles.breakdownDivider} />
                    
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabelBold}>Total Tax:</Text>
                      <Text style={styles.breakdownValueBold}>₹{taxResult.new.totalTax.toLocaleString()}</Text>
                    </View>
                  </View>
                )}
                
                {/* Comparison View */}
                {regime === 'comparison' && (
                  <>
                    <View style={styles.comparisonRow}>
                      <View style={styles.regimeCard}>
                        <Text style={styles.regimeTitle}>Old Regime</Text>
                        <Text style={styles.taxAmount}>₹{taxResult.old.totalTax.toLocaleString()}</Text>
                        <Text style={styles.netIncome}>Net: ₹{taxResult.old.netIncome.toLocaleString()}</Text>
                      </View>
                      
                      <View style={styles.regimeCard}>
                        <Text style={styles.regimeTitle}>New Regime</Text>
                        <Text style={styles.taxAmount}>₹{taxResult.new.totalTax.toLocaleString()}</Text>
                        <Text style={styles.netIncome}>Net: ₹{taxResult.new.netIncome.toLocaleString()}</Text>
                      </View>
                    </View>

                    <View style={[
                      styles.recommendationCard,
                      { backgroundColor: taxResult.recommendedRegime === 'Old Regime' ? '#e8f5e8' : '#fff3cd' }
                    ]}>
                      <Text style={styles.recommendationTitle}>
                        {taxResult.recommendedRegime} Saves You
                      </Text>
                      <Text style={styles.savingsAmount}>
                        ₹{Math.abs(taxResult.savings).toLocaleString()}
                      </Text>
                      <Text style={styles.recommendationText}>
                        Recommended: {taxResult.recommendedRegime}
                      </Text>
                    </View>
                    
                    {/* Bar Chart for Tax Comparison */}
                    <BarChart
                      data={{
                        labels: ['Old Regime', 'New Regime'],
                        datasets: [
                          {
                            data: [taxResult.old.totalTax, taxResult.new.totalTax],
                          },
                        ],
                      }}
                      width={Dimensions.get('window').width - 100}
                      height={220}
                      yAxisLabel="₹"
                      yAxisSuffix=""
                      chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 112, 186, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                      }}
                      style={{
                        marginVertical: 16,
                        borderRadius: 16,
                        alignSelf: 'center',
                      }}
                    />
                  </>
                )}
              </>
            )}
            
            {/* Deductions Tab */}
            {activeResultTab === 'deductions' && (
              <View style={styles.deductionsList}>
                {/* Section 80C */}
                <View style={styles.deductionItem}>
                  <Text style={styles.deductionTitle}>Section 80C Investments</Text>
                  <Text style={styles.deductionAmount}>₹{deductions80C.toLocaleString()}</Text>
                  <View style={styles.deductionProgress}>
                    <View 
                      style={[styles.deductionProgressFill, { width: `${Math.min(100, (deductions80C / 150000) * 100)}%` }]} 
                    />
                  </View>
                  <Text style={styles.deductionLimit}>Limit: ₹1,50,000</Text>
                </View>
                
                {/* Section 80D */}
                <View style={styles.deductionItem}>
                  <Text style={styles.deductionTitle}>Health Insurance (80D)</Text>
                  <Text style={styles.deductionAmount}>₹{deductions80D.toLocaleString()}</Text>
                  <View style={styles.deductionProgress}>
                    <View 
                      style={[styles.deductionProgressFill, { width: `${Math.min(100, (deductions80D / 50000) * 100)}%` }]} 
                    />
                  </View>
                  <Text style={styles.deductionLimit}>Limit: ₹50,000</Text>
                </View>
                
                {/* Home Loan Interest */}
                <View style={styles.deductionItem}>
                  <Text style={styles.deductionTitle}>Home Loan Interest</Text>
                  <Text style={styles.deductionAmount}>₹{homeLoanInterest.toLocaleString()}</Text>
                  <View style={styles.deductionProgress}>
                    <View 
                      style={[styles.deductionProgressFill, { width: `${Math.min(100, (homeLoanInterest / 200000) * 100)}%` }]} 
                    />
                  </View>
                  <Text style={styles.deductionLimit}>Limit: ₹2,00,000</Text>
                </View>
                
                <View style={styles.totalDeductionsContainer}>
                  <Text style={styles.totalDeductionsLabel}>Total Deductions (Old Regime):</Text>
                  <Text style={styles.totalDeductionsValue}>₹{taxResult.old.totalDeductions.toLocaleString()}</Text>
                </View>
              </View>
            )}
            
            {/* Year Comparison Tab */}
            {activeResultTab === 'yearComparison' && (
              <View style={styles.yearComparisonContainer}>
                <Text style={styles.sectionTitle}>Monthly Tax Distribution</Text>
                
                {/* Monthly breakdown */}
                <View style={styles.monthlyBreakdownContainer}>
                  <Text style={styles.monthlyBreakdownTitle}>Monthly Tax Breakdown</Text>
                  
                  <View style={styles.monthlyBreakdownHeader}>
                    <Text style={styles.monthlyBreakdownHeaderMonth}>Month</Text>
                    <Text style={styles.monthlyBreakdownHeaderTax}>Tax Amount</Text>
                  </View>
                  
                  {/* Sample monthly data */}
                  {[
                    { month: 'January', tax: taxResult.old.totalTax / 12 },
                    { month: 'February', tax: taxResult.old.totalTax / 12 },
                    { month: 'March', tax: taxResult.old.totalTax / 12 },
                    { month: 'April', tax: taxResult.old.totalTax / 12 },
                    { month: 'May', tax: taxResult.old.totalTax / 12 },
                    { month: 'June', tax: taxResult.old.totalTax / 12 },
                  ].map((item, index) => (
                    <View key={index} style={styles.monthlyBreakdownRow}>
                      <Text style={styles.monthlyBreakdownMonth}>{item.month}</Text>
                      <Text style={styles.monthlyBreakdownTax}>₹{Math.round(item.tax).toLocaleString()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#3b82f6',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 18,
  },
  // Main tab styles
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0,
    backgroundColor: '#f4f6fb',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f4f6fb',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#f4f6fb',
    borderBottomWidth: 3,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#3b82f6',
    fontWeight: '700',
  },
  // Regime tab styles
  regimeTabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0,
    backgroundColor: '#f4f6fb',
    padding: 3,
  },
  regimeTabButton: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 14,
    marginHorizontal: 2,
  },
  activeRegimeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  regimeTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  activeRegimeTabText: {
    color: '#3b82f6',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e6ed',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9fafc',
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    backgroundColor: '#f9fafc',
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e6ed',
    borderRadius: 12,
    backgroundColor: '#f9fafc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  picker: {
    height: 50,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  halfInput: {
    flex: 1,
  },
  leftInput: {
    marginRight: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: '#f4f6fb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 0,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  resultsContainer: {
    backgroundColor: '#f4f6fb',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3b82f6',
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  regimeCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  regimeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  taxAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#3b82f6',
  },
  netIncome: {
    fontSize: 14,
    color: '#555',
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f9fff9',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  savingsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#28a745',
  },
  recommendationText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Results tab styles (different from main tabs)
  resultsTabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultsTabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f7fafd',
    alignItems: 'center',
  },
  resultsActiveTab: {
    backgroundColor: '#3b82f6',
  },
  resultsTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  resultsActiveTabText: {
    color: '#ffffff',
  },
  breakdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3b82f6',
    textAlign: 'center',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  breakdownLabel: {
    fontSize: 15,
    color: '#555',
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  breakdownLabelBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  breakdownValueBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: '#e8eaf0',
    marginVertical: 10,
  },
  deductionText: {
    color: '#28a745',
  },
  // Two column layout
  twoColumnLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Tax Distribution styles
  taxDistributionFullContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chartSummaryContainer: {
    width: '90%',
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3b82f6',
    textAlign: 'center',
  },
  pieChartLabels: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 6,
  },
  pieChartPercentage: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  // Summary styles

  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 8,
  },
  cessDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 8,
  },
  netIncomeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28a745',
    marginRight: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  totalIncomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#e8eaf0',
  },
  totalIncomeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalIncomeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  // Deductions tab styles
  deductionsList: {
    marginTop: 8,
  },
  deductionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deductionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  deductionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3b82f6',
  },
  deductionProgress: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 6,
  },
  deductionProgressFill: {
    height: 8,
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  deductionLimit: {
    fontSize: 12,
    color: '#666',
  },
  totalDeductionsContainer: {
    backgroundColor: '#f7fafd',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalDeductionsLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  totalDeductionsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  // Year comparison tab styles
  yearComparisonContainer: {
    marginTop: 8,
  },
  yearComparisonPlaceholder: {
    backgroundColor: '#f7fafd',
    borderRadius: 10,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  monthlyBreakdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  monthlyBreakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3b82f6',
    textAlign: 'center',
  },
  monthlyBreakdownHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  monthlyBreakdownHeaderMonth: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  monthlyBreakdownHeaderTax: {
    width: 100,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'right',
  },
  monthlyBreakdownRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  monthlyBreakdownMonth: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  monthlyBreakdownTax: {
    width: 100,
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
    textAlign: 'right',
  },
});

export default TaxCalculator;