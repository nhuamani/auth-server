const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/jwt');


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
  const token = await generateJWT( dbUser.id, dbUser.firstname )


  // Save user in DB
  await dbUser.save()


  // Generate successful response
  return res.status(201).json({
    ok: true,
    uid: dbUser.id,
    firstname: firstname,
    token: token,
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
const logIn = async ( req, res = response ) => {

  const { email, password } = req.body

  try {

    const  dbUser = await Usuario.findOne({ email: email })

    if ( !dbUser ) {
      return res.status(400).json({
        ok: false,
        message: 'El correo no esta registrado'
      })
    }

    // Confirm if the password matches
    const validPassword = bcrypt.compareSync( password, dbUser.password )

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        message: 'El Password no es válido'
      })
    }

    // Generate JWT
    const token = await generateJWT( dbUser.id, dbUser.firstname )

    // Service response
    return res.json({
      ok: true,
      uid: dbUser.id,
      firstname: dbUser.firstname,
      token
    })

  } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Please contact the administrator'
    })
  }

}


// Generate y/o Refresh TOKEN
const newToken = async ( req, res = response ) => {

  const { uid, firstname } = req

  return res.json({
    ok: true,
    message: 'Generate New Token',
    uid,
    firstname,
  })

}


module.exports = {
  createUser,
  logIn,
  newToken
}
