const newPublication = require('./newPublication');
const getListPublication = require('./getListPublication');
const newLike = require('./newLike');
const deleteLike = require('./deleteLike');
const getPublication = require('./getPublication');
const addComent = require('./addComent');
const deletePublication = require('./deletePublication');
const deleteComments = require('./deleteComment');

module.exports = {
  newPublication,

  getPublication,

  getListPublication,

  newLike,

  deleteLike,

  addComent,

  deletePublication,

  deleteComments,
};
