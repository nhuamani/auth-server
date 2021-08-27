const { response } = require('express');
const { validationResult } = require('express-validator');


// Create new User
const createUser = ( req, res = response ) => {

  const { firstname, lastname, email, password } = req.body

  return res.json({
    ok: true,
    message: 'Create New User'
  })

}

// Log In User
const logIn = ( req, res = response ) => {

  const { email, password } = req.body

  return res.json({
    ok: true,
    message: 'Login of Users'
  })

}


// Generate and refresh token
const newToken = ( req, res = response ) => {

  return res.json({
    ok: true,
    message: 'Generate New Token'
  })

}


module.exports = {
  createUser,
  logIn,
  newToken
}
