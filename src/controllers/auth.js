const { response } = require('express');
const { validationResult } = require('express-validator');

// Create new User
const createUser = ( req, res = response ) => {

  const errors = validationResult(req)
  if ( !errors.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  const { firstname, lastname, email, password } = req.body
  console.log(firstname, lastname, email, password)

  return res.json({
    ok: true,
    message: 'Create New User'
  })

}

// Log In User
const logIn = ( req, res = response ) => {

  const errors = validationResult(req)
  if ( !errors.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  const { email, password } = req.body
  console.log(email, password)

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
