# PSB Fraud Shield - Enhanced Authentication Guide

## 🔐 Enhanced Authentication with OTP

The PSB Fraud Shield application now includes comprehensive OTP-enhanced authentication for secure user verification. This system supports both SMS and email OTP delivery methods with enhanced security features.

## 🚀 Quick Start

### 1. Environment Setup

Ensure your `.env` file includes:
```env
# Database
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# For Production OTP (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

### 2. Start the Unified Server
```bash
node unified-server.js
```

## 📱 Available Authentication Endpoints

### 1. Basic Authentication (Existing)

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "resetToken": "jwt_token_here",
  "newPassword": "newsecurepassword123"
}
```

### 2. Enhanced Authentication with OTP

#### Send Signup OTP
```http
POST /api/auth/send-signup-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
// OR
{
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully for signup verification",
  "expiresIn": "10 minutes"
}
```

#### Signup with OTP Verification
```http
POST /api/auth/signup-with-otp
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+1234567890",
  "otp": "123456",
  "identifier": "email_john@example.com_signup"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created and verified successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isVerified": true
  }
}
```

#### Send Login OTP (2FA)
```http
POST /api/auth/send-login-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login with OTP Verification
```http
POST /api/auth/login-with-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123",
  "otp": "123456",
  "identifier": "sms_+1234567890_login"
}
```

#### Forgot Password with OTP
```http
POST /api/auth/forgot-password-otp
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password with OTP
```http
POST /api/auth/reset-password-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "identifier": "email_john@example.com_reset",
  "newPassword": "newsecurepassword123"
}
```

### 3. General OTP Endpoints

#### Send SMS OTP
```http
POST /api/send-otp-sms
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "purpose": "verification"
}
```

#### Send Email OTP
```http
POST /api/send-otp-email
Content-Type: application/json

{
  "email": "user@example.com",
  "purpose": "verification"
}
```

#### Verify OTP
```http
POST /api/verify-otp
Content-Type: application/json

{
  "identifier": "sms_+1234567890_verification",
  "otp": "123456",
  "type": "sms"
}
```

#### Resend OTP
```http
POST /api/resend-otp
Content-Type: application/json

{
  "identifier": "sms_+1234567890_verification",
  "type": "sms"
}
```

#### Get OTP Status
```http
GET /api/otp-status/sms_+1234567890_verification
```

## 🔧 Frontend Integration

### Using the Enhanced API Utility

```typescript
import { 
  sendSignupOTP, 
  signupWithOTP, 
  sendLoginOTP, 
  loginWithOTP,
  forgotPasswordOTP,
  resetPasswordOTP 
} from '../utils/api';

// Enhanced Signup Flow
const handleEnhancedSignup = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  try {
    // Step 1: Send OTP
    const otpResponse = await sendSignupOTP(userData.email, userData.phone);
    if (otpResponse.success) {
      // Store identifier for verification
      const identifier = userData.email 
        ? `email_${userData.email}_signup`
        : `sms_${userData.phone}_signup`;
      
      // Proceed to OTP verification screen
      setSignupIdentifier(identifier);
      setShowOTPScreen(true);
    } else {
      console.error('Failed to send OTP:', otpResponse.error);
    }
  } catch (error) {
    console.error('Error sending signup OTP:', error);
  }
};

// Step 2: Complete signup with OTP
const handleSignupWithOTP = async (otp: string) => {
  try {
    const response = await signupWithOTP({
      ...userData,
      otp,
      identifier: signupIdentifier
    });
    
    if (response.success) {
      // Store token and navigate to main app
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } else {
      console.error('Signup failed:', response.error);
    }
  } catch (error) {
    console.error('Error completing signup:', error);
  }
};

// Enhanced Login Flow (2FA)
const handleEnhancedLogin = async (email: string, password: string) => {
  try {
    // Step 1: Send login OTP
    const otpResponse = await sendLoginOTP(email, password);
    if (otpResponse.success) {
      // Store credentials for final login
      setLoginCredentials({ email, password });
      setShowOTPScreen(true);
    } else {
      console.error('Failed to send login OTP:', otpResponse.error);
    }
  } catch (error) {
    console.error('Error sending login OTP:', error);
  }
};

// Step 2: Complete login with OTP
const handleLoginWithOTP = async (otp: string) => {
  try {
    const response = await loginWithOTP(
      loginCredentials.email,
      loginCredentials.password,
      otp,
      loginIdentifier
    );
    
    if (response.success) {
      // Store token and navigate to main app
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } else {
      console.error('Login failed:', response.error);
    }
  } catch (error) {
    console.error('Error completing login:', error);
  }
};

// Enhanced Password Reset Flow
const handleEnhancedPasswordReset = async (email: string) => {
  try {
    const response = await forgotPasswordOTP(email);
    if (response.success) {
      // Store email for final reset
      setResetEmail(email);
      setShowOTPScreen(true);
    } else {
      console.error('Failed to send reset OTP:', response.error);
    }
  } catch (error) {
    console.error('Error sending reset OTP:', error);
  }
};

// Complete password reset with OTP
const handleResetPasswordWithOTP = async (otp: string, newPassword: string) => {
  try {
    const response = await resetPasswordOTP(
      resetEmail,
      otp,
      resetIdentifier,
      newPassword
    );
    
    if (response.success) {
      // Navigate to login screen
      navigate('/login');
    } else {
      console.error('Password reset failed:', response.error);
    }
  } catch (error) {
    console.error('Error resetting password:', error);
  }
};
```

### React Native Component Example

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { sendSignupOTP, signupWithOTP } from '../utils/api';
import { PSBColors } from '../utils/PSBColors';

const EnhancedSignupScreen = () => {
  const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!formData.email && !formData.phone) {
      Alert.alert('Error', 'Please provide email or phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendSignupOTP(formData.email, formData.phone);
      if (response.success) {
        const id = formData.email 
          ? `email_${formData.email}_signup`
          : `sms_${formData.phone}_signup`;
        setIdentifier(id);
        setStep(2);
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        Alert.alert('Error', response.error || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await signupWithOTP({
        ...formData,
        otp,
        identifier
      });
      
      if (response.success) {
        Alert.alert('Success', 'Account created successfully');
        // Navigate to main app
      } else {
        Alert.alert('Error', response.error || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: PSBColors.background.primary }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: PSBColors.primary.green, marginBottom: 20 }}>
        PSB Fraud Shield - Signup
      </Text>
      
      {step === 1 ? (
        // Signup Form
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              fontSize: 16,
            }}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({...formData, firstName: text})}
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              fontSize: 16,
            }}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({...formData, lastName: text})}
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              fontSize: 16,
            }}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              fontSize: 16,
            }}
            placeholder="Phone (optional)"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            keyboardType="phone-pad"
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
              borderRadius: 8,
              padding: 15,
              marginBottom: 20,
              fontSize: 16,
            }}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={{
              backgroundColor: PSBColors.primary.green,
              padding: 15,
              borderRadius: 8,
            }}
            onPress={handleSendOTP}
            disabled={isLoading}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
              {isLoading ? 'Sending OTP...' : 'Send OTP & Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // OTP Verification
        <View>
          <Text style={{ fontSize: 18, color: PSBColors.text.secondary, marginBottom: 20 }}>
            Enter the OTP sent to your {formData.email ? 'email' : 'phone'}
          </Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
              borderRadius: 8,
              padding: 15,
              marginBottom: 20,
              fontSize: 16,
            }}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />
          
          <TouchableOpacity
            style={{
              backgroundColor: PSBColors.primary.gold,
              padding: 15,
              borderRadius: 8,
              marginBottom: 15,
            }}
            onPress={handleCompleteSignup}
            disabled={isLoading}
          >
            <Text style={{ color: PSBColors.text.primary, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
              {isLoading ? 'Creating Account...' : 'Complete Signup'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              padding: 15,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: PSBColors.border.primary,
            }}
            onPress={() => setStep(1)}
          >
            <Text style={{ color: PSBColors.text.secondary, textAlign: 'center', fontSize: 16 }}>
              Back to Form
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EnhancedSignupScreen;
```

## 🔒 Security Features

### 1. OTP Generation & Storage
- ✅ 6-digit numeric OTP
- ✅ Cryptographically secure random generation
- ✅ In-memory storage with expiration
- ✅ 10-minute validity period
- ✅ Automatic cleanup of expired OTPs

### 2. Verification Limits
- ✅ Maximum 3 attempts per OTP
- ✅ Automatic blocking after failed attempts
- ✅ Rate limiting protection
- ✅ Input validation

### 3. Enhanced Authentication Flow
- ✅ OTP verification for signup
- ✅ Two-factor authentication for login
- ✅ OTP-based password reset
- ✅ Secure token generation

### 4. Input Validation
- ✅ Phone number format validation
- ✅ Email format validation
- ✅ OTP format validation
- ✅ Password strength requirements

## 📊 User Experience Features

### 1. Multiple Delivery Methods
- ✅ SMS OTP delivery
- ✅ Email OTP delivery
- ✅ Fallback mechanisms
- ✅ User preference support

### 2. Clear Error Messages
- ✅ Specific error descriptions
- ✅ User-friendly messages
- ✅ Actionable feedback
- ✅ Retry mechanisms

### 3. Loading States
- ✅ Visual feedback during operations
- ✅ Disabled buttons during processing
- ✅ Progress indicators
- ✅ Timeout handling

## 🔧 Configuration Options

### Development Mode
- ✅ Simulated SMS/Email sending
- ✅ Console logging for OTPs
- ✅ Easy testing and debugging
- ✅ No external service dependencies

### Production Mode
- ✅ Twilio integration for SMS
- ✅ Nodemailer integration for email
- ✅ Professional email templates
- ✅ Secure OTP delivery

## 🚨 Error Handling

### Common Error Responses
```json
{
  "success": false,
  "message": "Phone number is required"
}
```

```json
{
  "success": false,
  "message": "Invalid phone number format"
}
```

```json
{
  "success": false,
  "message": "OTP expired"
}
```

```json
{
  "success": false,
  "message": "Too many attempts"
}
```

## 📋 Testing Guide

### 1. Test OTP Generation
```bash
curl -X POST http://localhost:4000/api/send-otp-sms \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "purpose": "test"}'
```

### 2. Test OTP Verification
```bash
curl -X POST http://localhost:4000/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "sms_+1234567890_test", "otp": "123456", "type": "sms"}'
```

### 3. Test Enhanced Signup
```bash
curl -X POST http://localhost:4000/api/auth/send-signup-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## 🎯 Best Practices

### 1. User Experience
- ✅ Clear step-by-step flow
- ✅ Informative error messages
- ✅ Loading states and feedback
- ✅ Accessibility considerations

### 2. Security
- ✅ Secure OTP generation
- ✅ Input validation
- ✅ Rate limiting
- ✅ Audit logging

### 3. Performance
- ✅ Efficient storage
- ✅ Quick response times
- ✅ Caching strategies
- ✅ Load balancing

### 4. Reliability
- ✅ Multiple delivery methods
- ✅ Fallback mechanisms
- ✅ Error recovery
- ✅ Monitoring alerts

---

**PSB Fraud Shield Enhanced Authentication** - Secure, reliable, and user-friendly authentication with OTP verification for banking applications.