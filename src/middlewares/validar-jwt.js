const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) => {

  const token = req.header('x-token')

  if ( !token ) {
    return res.status(401).json({
      success: false,
      message: 'No envió el token en su Header'
    })
  }

  try {

    const { uid, firstname } = jwt.verify( token, process.env.SECRET_KEY_JWT )
    console.log(uid, firstname)
    req.uid = uid
    req.firstname = firstname

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Token enviado no es válido'
    })

  }

  // TODO OK!
  next()
}


module.exports = {
  validarJWT
}
