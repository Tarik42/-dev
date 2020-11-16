var express = require('express');
var router = express.Router();
//anasayfayı yöneten metot
 module.exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
}



