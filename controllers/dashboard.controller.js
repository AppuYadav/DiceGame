'use strict';

const Game = require('../models/game.model')
const User = require('../models/user.model')

exports.dashboard = async function(req, res){
  const total = await Game.aggregate([{"$group": {_id:"$game_id", count:{$sum:1}, score: {$sum:"$score"}, timetaken: {$sum: "$timetaken"}, nickName: {$first: '$nickName'}}},{ $match: { count: { $gt : 2 }}}])
  console.log(JSON.stringify(total));
  res.status(200).json({responseCode: 200, scoreList: total})
}
