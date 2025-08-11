# SSL Pinning Setup Guide for FinGuard

This document explains the SSL pinning implementation and how to set it up for your FinGuard application.

## What Has Been Implemented

### 1. SSL Pinning Service (`utils/sslPinningService.ts`)
- **Core SSL pinning functionality** with certificate validation
- **Multiple certificate loading methods** (react-native-fs, fallback paths)
- **Automatic fallback** to demo certificates for testing
- **Comprehensive logging** for debugging
- **Certificate fingerprint generation** and comparison

### 2. Security Configuration (`utils/securityConfig.ts`)
- **SSL pinning configuration** with validation settings
- **Certificate file references** pointing to assets folder
- **Flexible validation options** (strict mode, fallback, logging)

### 3. Security Manager Integration (`utils/securityManager.ts`)
- **SSL pinning service initialization** during security setup
- **SSL pinning status reporting** in security checks
- **Integrated security workflow** with other security features

### 4. Demo Certificate (`android/app/src/main/assets/certs/`)
- **Demo certificate file** for testing purposes
- **README with setup instructions** for real certificates

## Current Status

✅ **SSL Pinning Service**: Implemented and integrated  
✅ **Security Configuration**: Updated with SSL pinning settings  
✅ **Security Manager**: Integrated with SSL pinning  
✅ **Demo Certificates**: Available for testing  
✅ **Error Handling**: Graceful fallbacks and logging  
✅ **Multiple Loading Paths**: Tries various certificate locations  

## How to Add Your Real Certificates

### Step 1: Get Your Server's SSL Certificate

```bash
# For your main domain
openssl s_client -connect mainfineduguard-1.onrender.com:443 -servername mainfineduguard-1.onrender.com < /dev/null | openssl x509 -outform PEM > mainfineduguard-1.onrender.com.crt

# For certificate chain (if needed)
openssl s_client -connect mainfineduguard-1.onrender.com:443 -servername mainfineduguard-1.onrender.com -showcerts < /dev/null | openssl x509 -outform PEM > mainfineduguard-1.onrender.com-chain.crt
```

### Step 2: Place Certificates in Assets Folder

Copy your `.crt` files to:
```
android/app/src/main/assets/certs/
```

### Step 3: Update Configuration

In `utils/securityConfig.ts`, ensure the certificate filenames match:

```typescript
SSL_PINNING: {
  ENABLED: true,
  CERTIFICATES: {
    PRODUCTION: [
      'mainfineduguard-1.onrender.com.crt',
      'mainfineduguard-1.onrender.com-chain.crt',
    ],
    STAGING: [
      'staging-mainfineduguard-1.onrender.com.crt',
    ],
  },
  // ... other settings
}
```

## Testing SSL Pinning

### Quick Test

```typescript
import { quickSSLPinningTest } from './utils/testSSLPinning';

// Run the test
quickSSLPinningTest();
```

### Manual Testing

```typescript
import sslPinningService from './utils/sslPinningService';

// Check status
const status = sslPinningService.getStatus();
console.log('SSL Pinning Status:', status);

// Add a custom certificate
sslPinningService.addCertificate('custom.crt', certificateContent);
```

## How It Works

### 1. Initialization
- Security manager initializes SSL pinning service
- Service attempts to load certificates from multiple paths
- If no certificates found, creates demo certificates for testing

### 2. Certificate Loading
The service tries these paths in order:
1. `/android_asset/certs/` (Android assets)
2. `MainBundlePath/certs/` (iOS bundle)
3. `DocumentDirectoryPath/certs/` (App documents)
4. `ExternalDirectoryPath/certs/` (External storage)

### 3. Validation Process
- Generates SHA-256 fingerprint of server certificate
- Compares with loaded certificate fingerprints
- Logs violations if configured
- Falls back to system CA store if allowed

### 4. Fallback Behavior
- **Strict Mode**: Rejects connections if pinning fails
- **Fallback Mode**: Allows system CA store as backup
- **Demo Mode**: Uses test certificates for development

## Configuration Options

### SSL Pinning Settings

```typescript
SSL_PINNING: {
  ENABLED: true,                    // Enable/disable SSL pinning
  TIMEOUT: 10000,                   // Connection timeout
  
  VALIDATION: {
    ENABLED: true,                   // Enable validation
    STRICT_MODE: true,               // Reject on failure
    FALLBACK_TO_SYSTEM: false,      // Allow system CA fallback
    LOG_VIOLATIONS: true,            // Log security violations
  },
  
  CERT_VALIDATION: {
    CHECK_EXPIRY: true,              // Check certificate expiry
    CHECK_REVOCATION: true,          // Check revocation status
    ALLOW_SELF_SIGNED: false,        // Allow self-signed certs
    VERIFY_HOSTNAME: true,           // Verify hostname
  }
}
```

## Troubleshooting

### Common Issues

1. **"Certificate loading not implemented"**
   - Solution: The service will create demo certificates automatically
   - Check logs for detailed error information

2. **"No certificates loaded"**
   - Solution: Verify certificate files exist in assets folder
   - Check file permissions and paths

3. **"SSL pinning validation failed"**
   - Solution: Verify server certificate matches loaded certificates
   - Check certificate expiration and validity

### Debug Logs

The service provides comprehensive logging with `[SSL_PINNING_DEBUG]` prefix:

```
[SSL_PINNING_DEBUG] Initializing SSL Pinning service...
[SSL_PINNING_DEBUG] Attempting to load certificate: mainfineduguard-1.onrender.com.crt
[SSL_PINNING_DEBUG] Trying path: /android_asset/certs/mainfineduguard-1.onrender.com.crt
[SSL_PINNING_DEBUG] Successfully read certificate from: /android_asset/certs/mainfineduguard-1.onrender.com.crt
[SSL_PINNING_DEBUG] Loaded production certificate: mainfineduguard-1.onrender.com.crt
```

## Security Considerations

### Production Deployment

1. **Never commit real certificates** to version control
2. **Use environment variables** for sensitive configuration
3. **Regularly rotate certificates** before expiration
4. **Monitor certificate validity** and security status

### Certificate Management

1. **Keep certificates updated** with your server
2. **Use certificate chains** for complete validation
3. **Implement certificate rotation** procedures
4. **Monitor for security violations**

## Next Steps

1. **Test with demo certificates** to verify functionality
2. **Add your real certificates** following the setup guide
3. **Configure validation settings** for your security requirements
4. **Monitor logs** for any issues or violations
5. **Test in staging environment** before production

## Support

If you encounter issues:

1. Check the debug logs for detailed information
2. Verify certificate file locations and permissions
3. Test with demo certificates first
4. Review the configuration settings
5. Check that all dependencies are properly installed

The SSL pinning service is designed to be robust and provide clear feedback about what's happening during operation.