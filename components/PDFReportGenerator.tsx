import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Download, FileText } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface TaxData {
  income: number;
  deductions: {
    section80C: number;
    section80D: number;
    section80G: number;
    homeLoanInterest: number;
  };
  oldRegimeTax: number;
  newRegimeTax: number;
  recommendation: string;
  savings: number;
}

interface PDFReportGeneratorProps {
  taxData: TaxData;
}

const PDFReportGenerator: React.FC<PDFReportGeneratorProps> = ({ taxData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDFReport = async () => {
    setIsGenerating(true);
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Smart Tax Assistant Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background-color: #0070ba; color: white; padding: 20px; text-align: center; }
            .section { margin: 20px 0; }
            .title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #0070ba; }
            .row { display: flex; justify-content: space-between; margin: 8px 0; }
            .label { font-weight: 600; }
            .value { font-weight: bold; }
            .recommendation { background-color: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center; }
            .savings { font-size: 24px; font-weight: bold; color: #28a745; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Smart Tax Assistant Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <div class="title">Income Summary</div>
            <div class="row">
              <span class="label">Annual Income:</span>
              <span class="value">₹${taxData.income.toLocaleString()}</span>
            </div>
          </div>

          <div class="section">
            <div class="title">Deductions Claimed</div>
            <div class="row">
              <span class="label">Section 80C:</span>
              <span class="value">₹${taxData.deductions.section80C.toLocaleString()}</span>
            </div>
            <div class="row">
              <span class="label">Section 80D:</span>
              <span class="value">₹${taxData.deductions.section80D.toLocaleString()}</span>
            </div>
            <div class="row">
              <span class="label">Section 80G:</span>
              <span class="value">₹${taxData.deductions.section80G.toLocaleString()}</span>
            </div>
            <div class="row">
              <span class="label">Home Loan Interest (24):</span>
              <span class="value">₹${taxData.deductions.homeLoanInterest.toLocaleString()}</span>
            </div>
          </div>

          <div class="section">
            <div class="title">Tax Calculation Comparison</div>
            <div class="row">
              <span class="label">Old Regime Tax:</span>
              <span class="value">₹${taxData.oldRegimeTax.toLocaleString()}</span>
            </div>
            <div class="row">
              <span class="label">New Regime Tax:</span>
              <span class="value">₹${taxData.newRegimeTax.toLocaleString()}</span>
            </div>
          </div>

          <div class="section">
            <div class="recommendation">
              <div class="title">Recommendation</div>
              <p>${taxData.recommendation}</p>
              <div class="savings">Total Savings: ₹${Math.abs(taxData.savings).toLocaleString()}</div>
            </div>
          </div>

          <div class="section">
            <div class="title">Tax Saving Tips for Next Year</div>
            <ul>
              <li>Maximize 80C investments early in the financial year</li>
              <li>Consider ELSS funds for dual benefit of tax saving and equity exposure</li>
              <li>Plan health insurance premiums for Section 80D benefits</li>
              <li>Keep proper documentation for all deductions claimed</li>
              <li>Review and compare tax regimes annually based on your income structure</li>
            </ul>
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Tax Report',
        });
      } else {
        Alert.alert('Success', 'PDF report generated successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not generate PDF report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <FileText size={20} color="#333" />
            <View style={styles.titleText}>
              <Text style={styles.title}>Tax Report Summary</Text>
              <Text style={styles.subtitle}>Generate comprehensive PDF report</Text>
            </View>
          </View>
          {taxData.income > 0 && (
            <TouchableOpacity
              style={[styles.button, isGenerating && styles.buttonDisabled]}
              onPress={generatePDFReport}
              disabled={isGenerating}
            >
              <Download size={16} color="#fff" />
              <Text style={styles.buttonText}>
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Annual Income</Text>
            <Text style={styles.summaryValue}>₹{taxData.income.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Deductions</Text>
            <Text style={styles.summaryValue}>
              ₹{Object.values(taxData.deductions).reduce((a, b) => a + b, 0).toLocaleString()}
            </Text>
          </View>
          {taxData.income > 0 && (
            <>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Recommended Regime</Text>
                <Text style={styles.summaryValue}>{taxData.recommendation}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Tax Savings</Text>
                <Text style={[styles.summaryValue, { color: '#28a745' }]}>
                  ₹{Math.abs(taxData.savings).toLocaleString()}
                </Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.includesSection}>
          <Text style={styles.includesTitle}>Report will include:</Text>
          <View style={styles.includesGrid}>
            <View style={styles.includeItem}>
              <View style={styles.bullet} />
              <Text style={styles.includeText}>Complete income breakdown</Text>
            </View>
            <View style={styles.includeItem}>
              <View style={styles.bullet} />
              <Text style={styles.includeText}>Deduction analysis</Text>
            </View>
            <View style={styles.includeItem}>
              <View style={styles.bullet} />
              <Text style={styles.includeText}>Tax regime comparison</Text>
            </View>
            <View style={styles.includeItem}>
              <View style={styles.bullet} />
              <Text style={styles.includeText}>Personalized recommendations</Text>
            </View>
            <View style={styles.includeItem}>
              <View style={styles.bullet} />
              <Text style={styles.includeText}>Tax saving strategies</Text>
            </View>
            <View style={styles.includeItem}>
              <View style={styles.bullet} />
              <Text style={styles.includeText}>Next year planning tips</Text>
            </View>
          </View>
        </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 20,
  },
  includesSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  includesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  includesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0070ba',
    marginRight: 8,
  },
  includeText: {
    fontSize: 12,
    color: '#6c757d',
    flex: 1,
  },
});

export default PDFReportGenerator;