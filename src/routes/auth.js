const { Router } = require('express');
const { createUser, logIn, newToken } = require('../controllers/auth');


const router = Router()

router.post('/login', logIn)
router.post('/new', createUser)
router.get('/token', newToken)


module.exports = router
