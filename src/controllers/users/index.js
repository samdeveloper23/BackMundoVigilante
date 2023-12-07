const newUser = require('./newUser');
const getOwnUser = require('./getOwnUser');
const validateCode = require('./validateCode');
const loginUsers = require('./loginUser');
const getUser = require('./getUser');
const sendRecoverPass = require('./sendRecoverPass');
const editUsersRecoverPass = require('./editUsersRecoverPass');
const editUsersPass = require('./editUserPass');
const editUserAvatar = require('./editUseravatar');
const deleteUser = require('./deleteUsers');
const getAllUsers = require('./getAllUsers');
const editUserInfo = require('./editUserInfo')

module.exports = {
  newUser,

  validateCode,

  loginUsers,

  getUser,

  sendRecoverPass,

  editUsersRecoverPass,

  editUsersPass,

  getOwnUser,

  editUserAvatar,

  deleteUser,

  getAllUsers,

  editUserInfo,
};
