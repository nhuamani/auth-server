const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, logIn, newToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router()

router.post('/login', [
  check('email', 'El email es obligatorio').isEmail().normalizeEmail(),
  check('password', 'Email valido min. 8 caracteres, min. una mayúscula, min. una minúscula y Al menos un caracter especial .!?@').isStrongPassword(),
  validateFields
], logIn)

router.post('/new', [
  check('firstname', 'Nombre min. 3 letras').isLength({ min: 3 }).isAlpha().not().isEmpty(),
  check('lastname', 'Apellido min. 3 letras').isLength({ min: 3 }).isAlpha().not().isEmpty(),
  check('email', 'El email no es correcto').isEmail().normalizeEmail(),
  check('password', 'Password valido min. 8 caracteres. Intenta mezclar letras (mayúscula y minúscula) y símbolos !.#&?@').isStrongPassword(),
  validateFields
] , createUser)

router.get('/token', validarJWT, newToken)


module.exports = router
