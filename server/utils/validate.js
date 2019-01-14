/**
 * 通用表单验证
 */
const validator = require('validator')
const Type = require('./type')

const validate = (formdata, rules, codeName) => {
  let result = ''
  for (const key of Object.keys(rules)) {
    if (rules[key]['required']) {
      let value = formdata[key]
      let isEmpty
      if (Type.isString(value)) {
        isEmpty = validator.isEmpty(formdata[key])
      } else if (Type.isNumber(value)) {
        isEmpty = false
      } else if (Type.isArray(value)) {
        isEmpty = value.length === 0
      }
      if (isEmpty) {
        let codeKey = `ERROR_REQUIRED_${key.toUpperCase()}`
        result = require(`../codes/${codeName.toLowerCase()}`)[codeKey]
        break
      }
    }
    if (rules[key]['regExp']) {
      let valid = validator.matches(formdata[key] + '', rules[key]['regExp'])
      if (!valid) {
        let codeKey = `ERROR_${key.toUpperCase()}`
        result = require(`../codes/${codeName.toLowerCase()}`)[codeKey]
        break
      }
    }
  }
  return result
}

module.exports = validate
