'use strict';

const Game = require('../models/game.model')
const User = require('../models/user.model')

exports.game = async function(req, res){
  console.log(JSON.stringify(req.body));
	const newGame = new Game({
        score: req.body.score,
        game_id: req.body.gameId,
        nickName: req.body.nickName,
        timetaken: req.body.timetaken,
  })

	try {
      const user = await User.find({'userName': req.body.userName})
      console.log(user)
      if(user.length == 0){
        res.status(200).json({'responseCode': 404, responseMessage: 'user does not exsists', userInfo: { userName: req.body.userName }})
      }else{
        newGame.user_id = user[0]._id;
        const newGamerRes = await newGame.save()
        console.log(newGamerRes)
        res.status(200).json({'responseCode': 200, responseMessage: 'score added successfully'})
      }
  } catch (err) {
    console.log(err);
      res.status(400).json({
          message: err.message
      })
  }
}
