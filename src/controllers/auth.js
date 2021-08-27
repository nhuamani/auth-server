const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');


// Create new User
const createUser = async ( req, res = response ) => {

  const { firstname, lastname, email, password } = req.body

  try {

  // Verify email
  const usuario = await Usuario.findOne({ email: email })

  if ( usuario ) {
    return res.status(409).json({
      ok: false,
      message: 'El usuario ya existe con este E-mail'
    })
  }

  // Create user with model
  dbUser = new Usuario(req.body)


  // Encrypt y/o hash passwords
  const salt = bcrypt.genSaltSync()
  dbUser.password = bcrypt.hashSync( password, salt )


  // Generate JWT


  // Save user in DB
  await dbUser.save()


  // Generate successful response
  return res.status(201).json({
    ok: true,
    uid: dbUser.id,
    firstname: firstname,
  })

  } catch (error) {

    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Please contact the administrator'
    })

  }

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
