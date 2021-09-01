const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/jwt');


// Create new User
const createUser = async ( req, res = response ) => {

  const { firstname, email, password } = req.body

  try {

  // Verify email
  const usuario = await Usuario.findOne({ email: email })

  if ( usuario ) {
    return res.status(409).json({
      success: false,
      message: 'Este email ya está en uso. Elige otro.'
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
    success: true,
    uid: dbUser.id,
    firstname: firstname,
    token: token,
  })

  } catch (error) {

    console.log(error)
    return res.status(500).json({
      success: false,
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
        success: false,
        message: 'Ingresa un correo electrónico válido'
      })
    }

    // Confirm if the password matches
    const validPassword = bcrypt.compareSync( password, dbUser.password )

    if ( !validPassword ) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña es incorrecta.'
      })
    }

    // Generate JWT
    const token = await generateJWT( dbUser.id, dbUser.firstname )

    // Service response
    return res.json({
      success: true,
      uid: dbUser.id,
      firstname: dbUser.firstname,
      token
    })

  } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Please contact the administrator'
    })
  }

}


// Generate y/o Refresh TOKEN
const newToken = async ( req, res = response ) => {

  const { uid, firstname } = req

  // Generate JWT
  const newtoken = await generateJWT( uid, firstname )

  return res.json({
    success: true,
    message: 'Generate New Token',
    uid,
    firstname,
    newtoken,
  })

}


module.exports = {
  createUser,
  logIn,
  newToken
}
