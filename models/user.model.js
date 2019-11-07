const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
		max: 20
	},
	password: {
		type: String,
		required: true,
		max: 20
	},
	nickName: {
		type: String,
		required: true,
		max: 20
	},
	role: {
		type: String,
		required: true,
		max: 20
	},
	createdAt: {
      type: Date,
      required: true,
      default: Date.now
  },
	updatedAt: {
      type: Date,
      required: true,
      default: Date.now
  }
},{strict: true})

module.exports = mongoose.model('User', UserScheme)
