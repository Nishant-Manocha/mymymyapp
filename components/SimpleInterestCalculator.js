import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({
    principal: '',
    rate: '',
    time: ''
  });

  const validateInputs = () => {
    const newErrors = { principal: '', rate: '', time: '' };
    let isValid = true;

    const principalNum = parseFloat(principal);
    const rateNum = parseFloat(rate);
    const timeNum = parseFloat(time);

    if (!principal || principalNum <= 0) {
      newErrors.principal = 'Principal amount must be greater than 0';
      isValid = false;
    }

    if (!rate || rateNum <= 0) {
      newErrors.rate = 'Interest rate must be greater than 0';
      isValid = false;
    }

    if (!time || timeNum <= 0) {
      newErrors.time = 'Time period must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculate = () => {
    if (!validateInputs()) return;

    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    const simpleInterest = (P * R * T) / 100;
    const totalAmount = P + simpleInterest;

    setResult({
      simpleInterest,
      totalAmount,
    });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
    setErrors({ principal: '', rate: '', time: '' });
  };

  const isFormValid = principal && rate && time &&
    parseFloat(principal) > 0 && parseFloat(rate) > 0 && parseFloat(time) > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Calculator size={32} color="#0066cc" />
          <Text style={styles.title}>Simple Interest Calculator</Text>
        </View>
        <Text style={styles.subtitle}>
          Calculate simple interest and visualize total amount growth
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <DollarSign size={20} color="#0066cc" />
          <Text style={styles.cardTitle}>Enter Loan Details</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Principal Amount (₹)</Text>
          <TextInput
            style={[styles.input, errors.principal && styles.inputError]}
            placeholder="Enter principal amount"
            value={principal}
            onChangeText={setPrincipal}
            keyboardType="numeric"
          />
          {errors.principal ? (
            <Text style={styles.errorText}>{errors.principal}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Percent size={16} color="#666666" />
            <Text style={styles.label}>Annual Interest Rate (%)</Text>
          </View>
          <TextInput
            style={[styles.input, errors.rate && styles.inputError]}
            placeholder="Enter interest rate"
            value={rate}
            onChangeText={setRate}
            keyboardType="numeric"
          />
          {errors.rate ? (
            <Text style={styles.errorText}>{errors.rate}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Calendar size={16} color="#666666" />
            <Text style={styles.label}>Time Period (Years)</Text>
          </View>
          <TextInput
            style={[styles.input, errors.time && styles.inputError]}
            placeholder="Enter time in years"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
          />
          {errors.time ? (
            <Text style={styles.errorText}>{errors.time}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.calculateButton, !isFormValid && styles.disabledButton]}
            onPress={calculate}
            disabled={!isFormValid}
          >
            <Calculator size={16} color="#ffffff" />
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
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
              <Text style={styles.resultLabel}>Simple Interest</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(result.simpleInterest)}
              </Text>
            </View>
            <View style={[styles.resultItem, styles.totalAmountItem]}>
              <Text style={styles.resultLabel}>Total Amount</Text>
              <Text style={[styles.resultValue, styles.totalAmountValue]}>
                {formatCurrency(result.totalAmount)}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Principal: {formatCurrency(parseFloat(principal))}</Text>
              <Text style={styles.detailText}>Interest Rate: {rate}% per annum</Text>
              <Text style={styles.detailText}>Time Period: {time} years</Text>
            </View>
          </View>

          {/* Line Chart */}
          <View style={{ marginTop: 24, backgroundColor: '#f3f4f6', borderRadius: 16, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
              Total Amount & Simple Interest Growth Over Time
            </Text>
            <LineChart
              data={{
                labels: Array.from({ length: parseInt(time) + 1 }, (_, i) => `${i} yr`),
                datasets: [
                  {
                    data: Array.from({ length: parseInt(time) + 1 }, (_, i) =>
                      parseFloat(principal) + (parseFloat(principal) * parseFloat(rate) * i) / 100
                    ),
                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                    strokeWidth: 2,
                  },
                  {
                    data: Array.from({ length: parseInt(time) + 1 }, (_, i) =>
                      (parseFloat(principal) * parseFloat(rate) * i) / 100
                    ),
                    color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
                    strokeWidth: 2,
                  },
                ],
                legend: ['Total Amount', 'Simple Interest'],
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
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '3',
                  strokeWidth: '2',
                  stroke: '#ffffff',
                },
              }}
              bezier
              style={{ borderRadius: 16, marginLeft: 0 }}
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
  inputError: { borderColor: '#ef4444' },
  errorText: { fontSize: 12, color: '#ef4444', marginTop: 4 },
  buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 8 },
  calculateButton: { flex: 1, backgroundColor: '#0066cc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8, gap: 8 },
  disabledButton: { backgroundColor: '#9ca3af' },
  calculateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  resetButton: { borderWidth: 1, borderColor: '#d1d5db', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  resetButtonText: { color: '#374151', fontSize: 16, fontWeight: '500' },
  resultContainer: { gap: 16 },
  resultItem: { backgroundColor: '#f3f4f6', borderRadius: 8, padding: 16 },
  totalAmountItem: { backgroundColor: '#dcfce7', borderWidth: 1, borderColor: '#bbf7d0' },
  resultLabel: { fontSize: 14, color: '#64748b', marginBottom: 4 },
  resultValue: { fontSize: 24, fontWeight: 'bold', color: '#0066cc' },
  totalAmountValue: { color: '#10b981' },
  detailsContainer: { gap: 4 },
  detailText: { fontSize: 14, color: '#64748b' },
});

export default SimpleInterestCalculator;
