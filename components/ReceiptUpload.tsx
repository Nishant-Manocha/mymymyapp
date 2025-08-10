import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Upload, FileText, ChevronDown } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';

const ReceiptUpload = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<{[key: number]: string}>({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<{[key: number]: boolean}>({});

  const categories = [
    '80C (Investments, Insurance, etc.)',
    '80D (Health Insurance)',
    '80G (Donations)',
    '24 (Home Loan Interest)'
  ];

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        multiple: true,
      });

      if (!result.canceled) {
        setFiles(result.assets);
        setIsProcessing(true);
        
        // Simulate OCR processing
        setTimeout(() => {
          setIsProcessing(false);
          Alert.alert(
            'OCR Processing Complete',
            'Receipt data has been extracted and categorized.',
            [{ text: 'OK' }]
          );
        }, 3000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload files');
    }
  };

  const handleCategorySelect = (fileIndex: number, category: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [fileIndex]: category
    }));
    setShowCategoryDropdown(prev => ({
      ...prev,
      [fileIndex]: false
    }));
  };

  const toggleCategoryDropdown = (fileIndex: number) => {
    setShowCategoryDropdown(prev => ({
      ...prev,
      [fileIndex]: !prev[fileIndex]
    }));
  };

  const handleConfirm = (fileIndex: number) => {
    const category = selectedCategories[fileIndex];
    if (!category) {
      Alert.alert('Error', 'Please select a category first');
      return;
    }
    Alert.alert('Success', `Receipt confirmed for ${category}`);
  };

  // Simulated extracted amounts (in real app, this would come from OCR)
  const getExtractedAmount = (fileName: string) => {
    // Simulate different amounts based on file name
    if (fileName.toLowerCase().includes('lic')) return '₹18,048';
    if (fileName.toLowerCase().includes('health')) return '₹12,500';
    if (fileName.toLowerCase().includes('elss')) return '₹1,50,000';
    if (fileName.toLowerCase().includes('donation')) return '₹5,000';
    if (fileName.toLowerCase().includes('school')) return '₹25,000';
    if (fileName.toLowerCase().includes('home')) return '₹2,00,000';
    return '₹10,000'; // Default amount
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Smart Receipt Scanner</Text>
        <Text style={styles.subtitle}>
          Upload receipts for automatic tax deduction extraction using OCR
        </Text>

        <TouchableOpacity
          style={styles.uploadArea}
          onPress={handleFileUpload}
          disabled={isProcessing}
        >
          <Upload size={48} color="#0070ba" />
          <Text style={styles.uploadText}>
            {files.length > 0 ? `${files.length} file(s) selected` : 'Choose receipt files'}
          </Text>
          <Text style={styles.uploadSubtext}>
            Supports JPG, PNG, PDF up to 5MB
          </Text>
        </TouchableOpacity>

        {files.length > 0 && (
          <View style={styles.filesWrapper}>
            <ScrollView style={styles.filesContainer}>
              {files.map((file, index) => (
                <View key={index} style={styles.fileWrapper}>
                  <View style={styles.fileItem}>
                    <FileText size={20} color="#6c757d" />
                    <View style={styles.fileInfo}>
                      <Text style={styles.fileName}>{file.name}</Text>
                    </View>
                    <Text style={styles.amountText}>
                      {getExtractedAmount(file.name)}
                    </Text>
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => handleConfirm(index)}
                    >
                      <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.categoryWrapper}>
                    <TouchableOpacity
                      style={styles.categoryDropdown}
                      onPress={() => toggleCategoryDropdown(index)}
                    >
                      <Text style={styles.categoryText}>
                        {selectedCategories[index] || 'Select Category'}
                      </Text>
                      <ChevronDown size={16} color="#6c757d" />
                    </TouchableOpacity>
                    
                    {showCategoryDropdown[index] && (
                      <View style={styles.dropdownMenu}>
                        <View style={styles.dropdownHeader}>
                          <Text style={styles.dropdownHeaderText}>Select Category</Text>
                        </View>
                        {categories.map((category, catIndex) => (
                          <TouchableOpacity
                            key={catIndex}
                            style={styles.dropdownItem}
                            onPress={() => handleCategorySelect(index, category)}
                          >
                            <Text style={styles.dropdownItemText}>{category}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                  {isProcessing && (
                    <Text style={styles.processingText}>Processing...</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.supportedDocs}>
          <Text style={styles.supportedTitle}>Supported Documents:</Text>
          <View style={styles.docGrid}>
            <Text style={styles.docItem}>• LIC/Insurance receipts</Text>
            <Text style={styles.docItem}>• Health insurance bills</Text>
            <Text style={styles.docItem}>• ELSS investment receipts</Text>
            <Text style={styles.docItem}>• Donation receipts</Text>
            <Text style={styles.docItem}>• School fee receipts</Text>
            <Text style={styles.docItem}>• Home loan statements</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 15, 
    color: '#666',
    marginBottom: 32,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    height: 200,
  },
  uploadText: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 13,
    color: '#999',
  },
  filesContainer: {
    maxHeight: 300,
    marginBottom: 20,
    zIndex: 2, // Higher z-index for scroll container
  },
  filesWrapper: {
    maxHeight: 300,
    marginBottom: 20,
    zIndex: 2, // Higher z-index for scroll container
  },
  fileWrapper: {
    marginBottom: 16,
    zIndex: 2, // Same z-index as container
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 2, // Same z-index as container
  },
  fileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  categoryWrapper: {
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 4,
    position: 'relative',
    zIndex: 3, // Higher than file items
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    width: 200,
    zIndex: 3, // Same as wrapper
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: 200,
    zIndex: 9999, // Highest z-index to appear above everything
  },
  dropdownHeader: {
    backgroundColor: '#0070ba',
    padding: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  dropdownHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
    marginLeft: 'auto',
    marginRight: 12,
  },
  confirmButton: {
    backgroundColor: '#0070ba',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  processingText: {
    fontSize: 13,
    color: '#0070ba',
    fontWeight: '600',
    marginLeft: 8,
  },
  supportedDocs: {
    marginTop: 24,
    zIndex: 1, // Lower z-index than dropdown
  },
  supportedTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  docGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  docItem: {
    fontSize: 13,
    color: '#666',
    width: '48%',
    marginBottom: 8,
    lineHeight: 18,
  },
});

export default ReceiptUpload;