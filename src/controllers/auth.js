const { response } = require('express');

// Create new User
const createUser = ( req, res = response ) => {

  const { email, name, password } = req.body
  console.log(email, name, password)

  return res.json({
    ok: true,
    message: 'Create New User'
  })

}

// Log In User
const logIn = ( req, res ) => {

  const { email, password } = req.body
  console.log(email, password)

  return res.json({
    ok: true,
    message: 'Login of Users'
  })

}


// Generate and refresh token
const newToken = ( req, res ) => {

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
