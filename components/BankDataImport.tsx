import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Upload } from 'lucide-react-native';

interface BankDataImportProps {
  onDataImport: (data: any) => void;
}

const BankDataImport: React.FC<BankDataImportProps> = ({ onDataImport }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const mockTransactions = [
    // January
    { id: '1', date: '2024-01-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '2', date: '2024-01-10', description: 'LIC Premium', amount: -10000, category: 'deduction', taxSection: '80C' },
    { id: '3', date: '2024-01-15', description: 'Grocery Shopping', amount: -5000, category: 'expense' },
    { id: '4', date: '2024-01-20', description: 'Health Insurance', amount: -7000, category: 'deduction', taxSection: '80D' },
    { id: '5', date: '2024-01-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    { id: '6', date: '2024-01-28', description: 'Utility Bills', amount: -3500, category: 'expense' },
    
    // February
    { id: '7', date: '2024-02-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '8', date: '2024-02-10', description: 'ELSS Investment', amount: -15000, category: 'deduction', taxSection: '80C' },
    { id: '9', date: '2024-02-15', description: 'Grocery Shopping', amount: -4800, category: 'expense' },
    { id: '10', date: '2024-02-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    { id: '11', date: '2024-02-28', description: 'Medical Expenses', amount: -3200, category: 'deduction', taxSection: '80D' },
    
    // March
    { id: '12', date: '2024-03-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '13', date: '2024-03-10', description: 'PPF Contribution', amount: -12000, category: 'deduction', taxSection: '80C' },
    { id: '14', date: '2024-03-15', description: 'Grocery Shopping', amount: -5200, category: 'expense' },
    { id: '15', date: '2024-03-20', description: 'Charitable Donation', amount: -5000, category: 'deduction', taxSection: '80G' },
    { id: '16', date: '2024-03-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // April
    { id: '17', date: '2024-04-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '18', date: '2024-04-10', description: 'Health Checkup', amount: -4500, category: 'deduction', taxSection: '80D' },
    { id: '19', date: '2024-04-15', description: 'Grocery Shopping', amount: -4900, category: 'expense' },
    { id: '20', date: '2024-04-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // May
    { id: '21', date: '2024-05-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '22', date: '2024-05-10', description: 'NSC Investment', amount: -8000, category: 'deduction', taxSection: '80C' },
    { id: '23', date: '2024-05-15', description: 'Grocery Shopping', amount: -5100, category: 'expense' },
    { id: '24', date: '2024-05-20', description: 'Parents Medical Insurance', amount: -12000, category: 'deduction', taxSection: '80D' },
    { id: '25', date: '2024-05-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // June
    { id: '26', date: '2024-06-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '27', date: '2024-06-10', description: 'Tuition Fee Payment', amount: -25000, category: 'deduction', taxSection: '80C' },
    { id: '28', date: '2024-06-15', description: 'Grocery Shopping', amount: -4700, category: 'expense' },
    { id: '29', date: '2024-06-20', description: 'Charitable Donation', amount: -3000, category: 'deduction', taxSection: '80G' },
    { id: '30', date: '2024-06-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // July
    { id: '31', date: '2024-07-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '32', date: '2024-07-10', description: 'ELSS Investment', amount: -10000, category: 'deduction', taxSection: '80C' },
    { id: '33', date: '2024-07-15', description: 'Grocery Shopping', amount: -5300, category: 'expense' },
    { id: '34', date: '2024-07-20', description: 'Medical Expenses', amount: -6500, category: 'deduction', taxSection: '80D' },
    { id: '35', date: '2024-07-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // August
    { id: '36', date: '2024-08-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '37', date: '2024-08-10', description: 'PPF Contribution', amount: -15000, category: 'deduction', taxSection: '80C' },
    { id: '38', date: '2024-08-15', description: 'Grocery Shopping', amount: -4800, category: 'expense' },
    { id: '39', date: '2024-08-20', description: 'Health Insurance', amount: -5000, category: 'deduction', taxSection: '80D' },
    { id: '40', date: '2024-08-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // September
    { id: '41', date: '2024-09-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '42', date: '2024-09-10', description: 'LIC Premium', amount: -10000, category: 'deduction', taxSection: '80C' },
    { id: '43', date: '2024-09-15', description: 'Grocery Shopping', amount: -5100, category: 'expense' },
    { id: '44', date: '2024-09-20', description: 'Charitable Donation', amount: -7000, category: 'deduction', taxSection: '80G' },
    { id: '45', date: '2024-09-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // October
    { id: '46', date: '2024-10-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '47', date: '2024-10-10', description: 'NSC Investment', amount: -12000, category: 'deduction', taxSection: '80C' },
    { id: '48', date: '2024-10-15', description: 'Grocery Shopping', amount: -5200, category: 'expense' },
    { id: '49', date: '2024-10-20', description: 'Medical Expenses', amount: -8500, category: 'deduction', taxSection: '80D' },
    { id: '50', date: '2024-10-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // November
    { id: '51', date: '2024-11-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '52', date: '2024-11-10', description: 'ELSS Investment', amount: -20000, category: 'deduction', taxSection: '80C' },
    { id: '53', date: '2024-11-15', description: 'Grocery Shopping', amount: -4900, category: 'expense' },
    { id: '54', date: '2024-11-20', description: 'Health Checkup', amount: -3500, category: 'deduction', taxSection: '80D' },
    { id: '55', date: '2024-11-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
    
    // December
    { id: '56', date: '2024-12-01', description: 'Salary Credit', amount: 70000, category: 'income' },
    { id: '57', date: '2024-12-10', description: 'PPF Contribution', amount: -13000, category: 'deduction', taxSection: '80C' },
    { id: '58', date: '2024-12-15', description: 'Grocery Shopping', amount: -6500, category: 'expense' },
    { id: '59', date: '2024-12-20', description: 'Charitable Donation', amount: -10000, category: 'deduction', taxSection: '80G' },
    { id: '60', date: '2024-12-25', description: 'Home Loan Interest', amount: -18000, category: 'deduction', taxSection: 'Home Loan' },
  ];

  const handleFetchBankData = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 2000);
  };

  const handleApplySuggestions = () => {
    // Calculate annual income (sum of all salary credits)
    const annualIncome = transactions
      .filter(t => t.description.includes('Salary Credit'))
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate section 80C deductions (LIC, ELSS, PPF)
    const section80C = transactions
      .filter(t => t.taxSection === '80C')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Calculate section 80D deductions (Health Insurance, Medical Expenses)
    const section80D = transactions
      .filter(t => t.taxSection === '80D')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Calculate section 80G deductions (Charitable Donations)
    const section80G = transactions
      .filter(t => t.taxSection === '80G')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Calculate home loan interest
    const homeLoanInterest = transactions
      .filter(t => t.taxSection === 'Home Loan')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const suggestions = {
      annualIncome,
      section80C,
      section80D,
      section80G,
      homeLoanInterest
    };
    
    onDataImport(suggestions);
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Auto-Fill from Bank Data</Text>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleFetchBankData}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Import Bank Transactions</Text>
            )}
          </TouchableOpacity>
        </View>

        {transactions.length > 0 && (
          <>
            <ScrollView style={styles.transactionsContainer}>
              {transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={[
                      styles.transactionAmount,
                      { color: transaction.amount > 0 ? '#28a745' : '#dc3545' }
                    ]}>
                      ₹{Math.abs(transaction.amount).toLocaleString()}
                    </Text>
                    <View style={[
                      styles.categoryBadge,
                      { backgroundColor: transaction.category === 'income' ? '#d4edda' : '#fff3cd' }
                    ]}>
                      <Text style={[
                        styles.categoryText,
                        { color: transaction.category === 'income' ? '#155724' : '#856404' }
                      ]}>
                        {transaction.taxSection || transaction.category}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Auto-Detected Tax Data:</Text>
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Annual Income:</Text>
                <Text style={styles.summaryValue}>₹{(transactions
                  .filter(t => t.description.includes('Salary Credit'))
                  .reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}</Text>
              </View>

              {/* Calculate total deductions */}
              {(() => {
                const section80C = transactions
                  .filter(t => t.taxSection === '80C')
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                const section80D = transactions
                  .filter(t => t.taxSection === '80D')
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                const section80G = transactions
                  .filter(t => t.taxSection === '80G')
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                const homeLoanInterest = transactions
                  .filter(t => t.taxSection === 'Home Loan')
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                const totalDeductions = section80C + section80D + section80G + homeLoanInterest;
                
                return (
                  <>
                    <Text style={styles.deductionsTitle}>Total Deductions: ₹{totalDeductions.toLocaleString()}</Text>
                    
                    <View style={styles.deductionsGrid}>
                      <View style={styles.deductionItem}>
                        <Text style={styles.deductionLabel}>80C Deductions:</Text>
                        <Text style={styles.deductionValue}>₹{section80C.toLocaleString()}</Text>
                      </View>
                      <View style={styles.deductionItem}>
                        <Text style={styles.deductionLabel}>80D Deductions:</Text>
                        <Text style={styles.deductionValue}>₹{section80D.toLocaleString()}</Text>
                      </View>
                      <View style={styles.deductionItem}>
                        <Text style={styles.deductionLabel}>80G Deductions:</Text>
                        <Text style={styles.deductionValue}>₹{section80G.toLocaleString()}</Text>
                      </View>
                      <View style={styles.deductionItem}>
                        <Text style={styles.deductionLabel}>Home Loan Interest:</Text>
                        <Text style={styles.deductionValue}>₹{homeLoanInterest.toLocaleString()}</Text>
                      </View>
                    </View>
                  </>
                );
              })()}


              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplySuggestions}
              >
                <Text style={styles.applyButtonText}>Apply to Tax Calculator</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  button: {
    backgroundColor: '#0070ba',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  transactionLeft: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deductionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#6c757d',
  },
  deductionsGrid: {
    marginBottom: 16,
    flexDirection: 'column',
  },
  deductionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  deductionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  deductionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#0070ba',
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default BankDataImport;