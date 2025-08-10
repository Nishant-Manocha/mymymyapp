import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, Layers } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFreq, setCompoundFreq] = useState('yearly');
  const [result, setResult] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCompoundTimes = () => {
    switch (compoundFreq) {
      case 'yearly': return 1;
      case 'half-yearly': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      default: return 1;
    }
  };

  const calculate = () => {
    if (!principal || !rate || !time) return;

    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const n = getCompoundTimes();

    const totalAmount = P * Math.pow(1 + R / n, n * T);
    const compoundInterest = totalAmount - P;

    setResult({
      compoundInterest,
      totalAmount,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Calculator size={32} color="#0066cc" />
          <Text style={styles.title}>Compound Interest Calculator</Text>
        </View>
        <Text style={styles.subtitle}>
          Calculate compound interest with different compounding frequencies
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <DollarSign size={20} color="#0066cc" />
          <Text style={styles.cardTitle}>Enter Investment Details</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Principal Amount (₹)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter principal"
            value={principal}
            onChangeText={setPrincipal}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Percent size={16} color="#666666" />
            <Text style={styles.label}>Annual Interest Rate (%)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter rate"
            value={rate}
            onChangeText={setRate}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Calendar size={16} color="#666666" />
            <Text style={styles.label}>Time Period (Years)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter time"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Layers size={16} color="#666666" />
            <Text style={styles.label}>Compounding Frequency</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={compoundFreq}
              onValueChange={(itemValue) => setCompoundFreq(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Yearly" value="yearly" />
              <Picker.Item label="Half-Yearly" value="half-yearly" />
              <Picker.Item label="Quarterly" value="quarterly" />
              <Picker.Item label="Monthly" value="monthly" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
          <Calculator size={16} color="#ffffff" />
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      {result && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TrendingUp size={20} color="#10b981" />
            <Text style={styles.cardTitle}>Calculation Results</Text>
          </View>
          <View style={styles.resultContainer}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Compound Interest</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(result.compoundInterest)}
              </Text>
            </View>
            <View style={[styles.resultItem, styles.totalAmountItem]}>
              <Text style={styles.resultLabel}>Total Amount</Text>
              <Text style={[styles.resultValue, styles.totalAmountValue]}>
                {formatCurrency(result.totalAmount)}
              </Text>
            </View>
          </View>

          {/* Graph */}
          <View style={styles.chartWrapper}>
            <Text style={styles.chartTitle}>Growth Over Time</Text>
            <LineChart
              data={{
                labels: Array.from({ length: parseInt(time) + 1 }, (_, i) => `${i} yr`),
                datasets: [
                  {
                    data: Array.from({ length: parseInt(time) + 1 }, (_, i) =>
                      parseFloat(principal) * Math.pow(1 + (parseFloat(rate) / 100) / getCompoundTimes(), getCompoundTimes() * i)
                    ),
                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                    strokeWidth: 2,
                  },
                ],
                legend: ['Total Amount'],
              }}
              width={Math.min(screenWidth - 64, 320)}
              height={160}
              yAxisLabel="₹"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#f9fafb',
                backgroundGradientTo: '#f9fafb',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: '3',
                  strokeWidth: '2',
                  stroke: '#ffffff',
                },
              }}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', marginBottom: 32 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', maxWidth: 300 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 24, marginHorizontal: 16, marginBottom: 20, elevation: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b' },
  inputContainer: { marginBottom: 16 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 4 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151' },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, backgroundColor: '#f9fafb' },
  pickerContainer: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, backgroundColor: '#f9fafb' },
  picker: { height: 50, width: '100%' },
  calculateButton: { backgroundColor: '#0066cc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, gap: 8 },
  calculateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  resultContainer: { gap: 16 },
  resultItem: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16 },
  totalAmountItem: { backgroundColor: '#dcfce7', borderWidth: 1, borderColor: '#bbf7d0' },
  resultLabel: { fontSize: 14, color: '#64748b', marginBottom: 4 },
  resultValue: { fontSize: 24, fontWeight: 'bold', color: '#0066cc' },
  totalAmountValue: { color: '#10b981' },
  chartWrapper: { marginTop: 24, backgroundColor: '#f3f4f6', borderRadius: 16, padding: 16, alignItems: 'center', justifyContent: 'center' },
  chartTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center' },
});

export default CompoundInterestCalculator;
