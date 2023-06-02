import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('$59cdb9af-6C22-4571-Ab46-82603d6')
const iv = CryptoJS.enc.Utf8.parse('ec-B909-0242ac1@')

export const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  // 返回的是base64格式的密文
  return encrypted.ciphertext.toString().toUpperCase()
}

// AES解密
export const decrypt = (data) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypted = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
