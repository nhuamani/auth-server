const jwt = require('jsonwebtoken');


// Generate TOKEN
const generateJWT = ( uid, firstname ) => {

  const payload = { uid, firstname }
  console.log(payload, '=======================================');

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
