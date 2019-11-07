'use strict';

const User = require('../models/user.model')

exports.createOrExistsUser = async function(req, res){

	const user = new User({
        userName: req.body.userName,
        password: req.body.password,
				nickName: req.body.nickName,
				role: req.body.userName == 'admin' ? 'admin' : 'user'
  })

	try {
      const userexists = await User.find({'userName': req.body.userName})

      if(userexists.length == 0){
        const newUser = await user.save()
				if(user.role == 'admin'){
					res.status(200).json({'responseCode': 200, responseMessage: 'admin login successfully', userInfo: {userName: newUser.userName, nickName: newUser.nickName, role: newUser.role}})
				}else{
					res.status(200).json({'responseCode': 200, responseMessage: 'user register successfully', userInfo: {userName: newUser.userName, nickName: newUser.nickName, role: newUser.role }})
				}
      }else{
        const updateUser = await User.findById(userexists[0]._id)

        if (req.body.nickName != null) {
           updateUser.nickName = req.body.nickName
        }

        const updateUserRes = await updateUser.save()
				if(user.role == 'admin'){
					res.status(200).json({'responseCode': 200, responseMessage: 'admin login successfully', userInfo: {userName: updateUserRes.userName, nickName: updateUserRes.nickName, role: updateUserRes.role }})
				}else{
					res.status(200).json({'responseCode': 200, responseMessage: 'user update successfully', userInfo: {userName: updateUserRes.userName, nickName: updateUserRes.nickName, role: updateUserRes.role }})
				}
      }
  } catch (err) {
    console.log(err);
      res.status(400).json({
          message: err.message
      })
  }
}
