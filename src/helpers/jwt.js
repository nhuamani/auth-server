const jwt = require('jsonwebtoken');


const generateJWT = ( uid, name ) => {

  const payload = { uid, name }

  return new Promise( ( resolve, reject ) => {

    jwt.sign( payload, process.env.SECRET_KEY_JWT, {
      expiresIn: '4h'
    }, (error, token) => {

      if ( error ) {
        console.log(error)
        reject(error)
      } else {
        resolve(token)
      }

    });

  })

}


module.exports = {
  generateJWT
}
