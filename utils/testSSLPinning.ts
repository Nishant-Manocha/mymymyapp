import sslPinningService from './sslPinningService';

/**
 * Test script for SSL Pinning functionality
 * Run this to verify that SSL pinning is working correctly
 */
export async function testSSLPinning(): Promise<void> {
  console.log('🧪 Testing SSL Pinning Service...');
  
  try {
    // Test 1: Initialize the service
    console.log('\n1️⃣ Initializing SSL Pinning service...');
    await sslPinningService.initialize();
    console.log('✅ Service initialized successfully');
    
    // Test 2: Check service status
    console.log('\n2️⃣ Checking service status...');
    const status = sslPinningService.getStatus();
    console.log('Status:', status);
    
    // Test 3: Check if service is enabled
    console.log('\n3️⃣ Checking if service is enabled...');
    const isEnabled = sslPinningService.isEnabled();
    console.log('Service enabled:', isEnabled);
    
    // Test 4: Test certificate validation with demo certificate
    console.log('\n4️⃣ Testing certificate validation...');
    const demoCert = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/OvK8T7LMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTYwMzE2MTU0NzQ5WhcNMTcwMzE2MTU0NzQ5WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAvxL8Jfo3SRg78uRve3TR0Mv3ejFvcMwyAjpF7VuMVUeM6ytXaOStvgfI
8QGsgwSiIjhlp03dvt3dY7FrgDY5NavidNCvl/HsIabt3BL8rPB3nVPCZBljHJcL
8MgYWtZWGW1iBEzh+aFdCxY3iE5cgrTtj9Hwoyi3ghOvCgTEmuyLHc3bqaic4DHE
b5jILRjkMQtJUCFTQhCGlQvZbLOi3yr+UoWhlHsIB5Nfl3D9o58b24VfWm9xTiFY
7tcfM7i7+v9EtiyEbG+MPMQuTNg+AGW3xWfw3QvM4fS2iDRijkdLmjiJ+UASR9GB
iKRO6mTHlSGxI93B7Gtncg5wxg==
-----END CERTIFICATE-----`;
    
    const isValid = await sslPinningService.validateCertificate(demoCert, 'test.example.com');
    console.log('Demo certificate validation result:', isValid);
    
    // Test 5: Test certificate comparison
    console.log('\n5️⃣ Testing certificate comparison...');
    const sameCert = await sslPinningService.compareCertificates(demoCert, demoCert);
    console.log('Same certificate comparison:', sameCert);
    
    // Test 6: Add a custom certificate
    console.log('\n6️⃣ Testing manual certificate addition...');
    sslPinningService.addCertificate('custom-test.crt', demoCert);
    console.log('Custom certificate added');
    
    // Test 7: Final status check
    console.log('\n7️⃣ Final status check...');
    const finalStatus = sslPinningService.getStatus();
    console.log('Final status:', finalStatus);
    
    console.log('\n🎉 SSL Pinning test completed successfully!');
    
  } catch (error) {
    console.error('❌ SSL Pinning test failed:', error);
  }
}

/**
 * Quick test function that can be called from anywhere
 */
export function quickSSLPinningTest(): void {
  console.log('🚀 Quick SSL Pinning test...');
  testSSLPinning().catch(console.error);
}

export default testSSLPinning;