var express = require('express')
var router = express.Router()

var user_controller = require('../controllers/user.controller')
var game_controller = require('../controllers/game.controller')
var dashboard = require('../controllers/dashboard.controller')

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login Gamer' })
});

router.get('/sign-up', (req, res) => {
	res.render('login', { title: 'Login Gamer' })
});

router.get('/', (req, res) => {
	res.render('login', { title: 'Login Gamer' })
});

router.get('/game', (req, res) => {
	res.render('game', { title: 'Play Game' })
});

router.post('/login', user_controller.createOrExistsUser);

router.post('/game', game_controller.game);

// dashboard page
router.get('/dashboard', (req, res) => {
	res.render('dashboard', { title: 'User Info' })
});

router.get('/dashboard-data', dashboard.dashboard);

module.exports = router;
