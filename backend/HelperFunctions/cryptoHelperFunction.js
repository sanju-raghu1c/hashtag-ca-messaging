const crypto = require('crypto')
var fs = require('fs')
const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const iv = crypto.randomBytes(16)

exports.encrypt = function (text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  }
}

exports.decrypt = function (encrptedString) {

   let hash =   {
        iv: encrptedString.substring(0, 32),
        content: encrptedString.substring(32, encrptedString.length),
      }

     
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex'),
  )

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ])

  return decrpyted.toString()
}



