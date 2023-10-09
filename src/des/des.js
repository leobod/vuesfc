const CryptoJS = require('crypto-js')
// const iv = 'VXBsdXMxMjM='
// const key = 'VXBsdXMxMjM='
// Uplus123

const wrapperFun = (val) => {
  return Buffer.from(val, 'base64').toString()
}
/**
 * @description: des加密方法
 * @param {*} message 需要加密的数据
 * @return {*} 返回加密过后的值
 */
const encryptByDES = (message) => {
  const keyHex = CryptoJS.enc.Utf8.parse(wrapperFun('VXBsdXMxMjM='))
  const ivHex = CryptoJS.enc.Utf8.parse(wrapperFun('VXBsdXMxMjM='))
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}
/**
 * @description: des解密方法
 * @param {*} message 需要解密的值
 * @return {*} 返回解密过后的值
 */
const decryptByDES = (message) => {
  const keyHex = CryptoJS.enc.Utf8.parse(wrapperFun('VXBsdXMxMjM='))
  const ivHex = CryptoJS.enc.Utf8.parse(wrapperFun('VXBsdXMxMjM='))
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(message)
  }, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

const encryptBySHA256 = (message) => {
  return CryptoJS.SHA256(message).toString()
}

module.exports = {
  decryptByDES,
  encryptByDES
}
