import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View, Text, StyleSheet } from 'react-native';
import { getSecureTextInputProps, showSecurityWarning } from '../utils/appSecurity';

interface SecureTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secure?: boolean;
  showSecurityIndicator?: boolean;
}

export const SecureTextInput = forwardRef<TextInput, SecureTextInputProps>(
  ({ label, error, secure = false, showSecurityIndicator = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const secureProps = getSecureTextInputProps();

    const handleFocus = () => {
      setIsFocused(true);
      props.onFocus?.(undefined as any);
    };

    const handleBlur = () => {
      setIsFocused(false);
      props.onBlur?.(undefined as any);
    };

    const handleLongPress = () => {
      showSecurityWarning('Copy/paste is disabled for security reasons');
      return false;
    };

    const handleSelectionChange = () => {
      showSecurityWarning('Text selection is disabled for security reasons');
      return false;
    };

    return (
      <View style={styles.container}>
        {label && (
          <Text style={[styles.label, error && styles.labelError]}>
            {label}
            {showSecurityIndicator && (
              <Text style={styles.securityIndicator}> 🔒</Text>
            )}
          </Text>
        )}
        <View style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError
        ]}>
          <TextInput
            ref={ref}
            style={[styles.input, props.style]}
            secureTextEntry={secure && !showPassword}
            {...secureProps}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onLongPress={handleLongPress}
            onSelectionChange={handleSelectionChange}
            placeholderTextColor="#999"
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            contextMenuHidden={true}
            selectTextOnFocus={false}
          />
        </View>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  labelError: {
    color: '#d32f2f',
  },
  securityIndicator: {
    fontSize: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputContainerFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: '#d32f2f',
    borderWidth: 2,
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 0,
    margin: 0,
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: 4,
  },
});

SecureTextInput.displayName = 'SecureTextInput';

export default SecureTextInput;
