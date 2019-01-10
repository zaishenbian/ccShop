/**
 * 通用表单验证
 */
const validator = require('validator')

const validate = (formdata, rules, codeName) => {
  let result = ''
  for (const key of Object.keys(rules)) {
    if (rules[key]['required']) {
      let isEmpty = validator.isEmpty(formdata[key])
      if (isEmpty) {
        let codeKey = `ERROR_REQUIRED_${key.toUpperCase()}`
        result = require(`../codes/${codeName.toLowerCase()}`)[codeKey]
        break
      }
    }
    if (rules[key]['regExp']) {
      let valid = validator.matches(formdata[key], rules[key]['regExp'])
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
