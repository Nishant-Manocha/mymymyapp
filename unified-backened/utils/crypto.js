const CryptoJS = require('crypto-js');

function encryptWithSharedSecret(plaintext, secret) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const key = CryptoJS.SHA256(secret);
  const cipher = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return {
    payload: cipher.ciphertext.toString(CryptoJS.enc.Base64),
    ivBase64: CryptoJS.enc.Base64.stringify(iv),
  };
}

function decryptWithSharedSecret(ciphertextBase64, secret, ivBase64) {
  const key = CryptoJS.SHA256(secret);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(ciphertextBase64) },
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

module.exports = { encryptWithSharedSecret, decryptWithSharedSecret };
