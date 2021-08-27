const { response } = require('express');

// Create new User
const createUser = ( req, res = response ) => {

  return res.json({
    ok: true,
    message: 'Create New User'
  })

}

// Log In User
const logIn = ( req, res ) => {

  return res.json({
    oh: true,
    message: 'Login of Users'
  })

}


// Generate and refresh token
const newToken = ( req, res ) => {

  return res.json({
    oh: true,
    message: 'Generate New Token'
  })

}


module.exports = {
  createUser,
  logIn,
  newToken
}
