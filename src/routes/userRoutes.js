const express = require('express');
const route = express.Router();
const authUser = require('../middlewares/authUsers');
const userExists = require('../middlewares/userExists');

const {
    newUser,
    validateCode,
    loginUsers,
    getUser,
    getOwnUser,
    sendRecoverPass,
    editUsersRecoverPass,
    editUsersPass,
    editUserAvatar,
    deleteUser,
    getAllUsers,
    editUserInfo,
} = require('../controllers/users');
const authUserOptional = require('../middlewares/authUserOptional');
const activationStatus = require('../controllers/users/activationStatus');
const editUserPlace = require('../controllers/users/editUserPlace');

//MIDDLEWARES USERS

//Crea un usuario pendiente de validar.
route.post(`/users`, newUser);

//Valida a un usuario recién registrado para darle acceso.
route.get('/users/validate/:regCode', validateCode);

route.post('/users/activation-status', activationStatus);

//Logea a un usuario retornando un token.
route.post('/users/login', loginUsers);

//Retorna información del usuario del token.
route.get('/users/owner', authUser, userExists, getOwnUser);

//Retorna información de un usuario concreto.
route.get('/users/:userId', authUserOptional, getUser);

//Retorna un listado de usuarios a través de un filtro de búsqueda
route.get('/users', authUserOptional, getAllUsers);

//Permite añadir o actualizar la información del usuario.
route.put('/users/info', authUser, userExists, editUserInfo);

//Permite añadir o actualizar el lugar de residencia del usuario.
route.put('/users/place', authUser, userExists, editUserPlace);

//Permite añadir o actualizar el avatar del usuario.
route.put('/users/avatar', authUser, userExists, editUserAvatar);

//Envía al usuario un correo de recuperación de contraseña.
route.post('/users/password/recover', sendRecoverPass);

//Permite actualizar la contraseña mediante la recuperación.
route.put('/users/password/recover', editUsersRecoverPass);

//Resetea la contraseña de un usuario.
route.put('/users/password', authUser, userExists, editUsersPass);

//Permite eliminar al usuario del token
route.delete('/users/:userId', authUser, userExists, deleteUser);

module.exports = route;
