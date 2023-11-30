// import { completeSESSIONRV } from '@/utils/index'
// import { decryptByDES, encryptByDES } from '@/utils/des'
const { decryptByDES, encryptByDES } = require('./des')

const SESSIONRV_Decode = function(param) {
  const current = new Date()
  const currentTimeStamp = current.getTime()
  const val = param // completeSESSIONRV()
  if (val) {
    const dVal = decryptByDES(val)
    const dValArr = dVal.split('|')
    const end = dValArr[1]
    if (end) {
      const endTimeStamp = isNaN(Number(end)) ? 0 : Number(end)
      return endTimeStamp - currentTimeStamp >= 0
    }
  }
  return false
}

const SESSIONRV_Encode = function() {
  const start = ''
  const end = new Date('2023-09-12 15:00:00').getTime()
  const startAndEnd = start + '|' + end
  return encryptByDES(startAndEnd)
}

console.log(SESSIONRV_Encode())
