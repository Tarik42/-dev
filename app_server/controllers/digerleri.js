var express = require('express');
var router = express.Router();
//anasayfayı yöneten metot
 const hakkinda = function(req, res, next) {
  res.render('hakkinda', { 
    title: 'Hakkında',
    'footer': 'Tarık Kırcalı'
   });
}

module.exports={
	hakkinda
}


