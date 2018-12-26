const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  //角色名称
  name: String
})

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;