# SSL Certificate Files for SSL Pinning

This directory contains SSL certificates used for SSL pinning in the FinGuard app.

## Current Files

- `demo-certificate.crt` - A demo certificate for testing purposes

## How to Add Your Actual Certificates

1. **Get your server's SSL certificate:**
   ```bash
   # For your domain (replace with your actual domain)
   openssl s_client -connect mainfineduguard-1.onrender.com:443 -servername mainfineduguard-1.onrender.com < /dev/null | openssl x509 -outform PEM > mainfineduguard-1.onrender.com.crt
   ```

2. **Get the certificate chain (if needed):**
   ```bash
   openssl s_client -connect mainfineduguard-1.onrender.com:443 -servername mainfineduguard-1.onrender.com -showcerts < /dev/null | openssl x509 -outform PEM > mainfineduguard-1.onrender.com-chain.crt
   ```

3. **Place your certificates in this directory:**
   - Copy your `.crt` files to this directory
   - Make sure the filenames match what's configured in `utils/securityConfig.ts`

4. **Update the configuration:**
   In `utils/securityConfig.ts`, update the `SSL_PINNING.CERTIFICATES` section:
   ```typescript
   CERTIFICATES: {
     PRODUCTION: [
       'mainfineduguard-1.onrender.com.crt',
       'mainfineduguard-1.onrender.com-chain.crt',
     ],
     STAGING: [
       'staging-mainfineduguard-1.onrender.com.crt',
     ],
   },
   ```

## Certificate Formats Supported

- `.crt` - Certificate files
- `.pem` - PEM format certificates
- `.cer` - DER format certificates
- `.der` - Binary DER format

## Testing

The app will automatically create demo certificates if no real certificates are found. This allows you to test the SSL pinning functionality without having real certificates initially.

## Security Note

- Never commit real production certificates to version control
- Use environment variables or secure storage for production certificates
- Regularly update your certificates before they expire
- Monitor certificate validity and rotation