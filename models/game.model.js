const mongoose = require('mongoose');

const GameScheme = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		max: 30
	},
  game_id: {
		type: String,
		required: true,
		max: 30
	},
	nickName: {
		type: String,
		required: true,
		max: 30
	},
	score: {
		type: Number,
		required: true,
		max: 20
	},
	timetaken: {
		type: Number,
		required: true
	},
	createdAt: {
      type: Date,
      required: true,
      default: Date.now
  }
},{strict: true})

module.exports = mongoose.model('Game', GameScheme)
