var express = require('express');
var router = express.Router();

router.get('/:url_name', function(req, res) {
  var models = require('../models/');
  var url_name = req.params.url_name;

  //console.log(url_name);
  models.Page.findOne({ url_name: url_name }, function(err, wikiPage) {
    if (err) {
      console.log(err);
    }
    else {
      if(wikiPage) {
        console.log("Wikipage found", wikiPage);
        res.render('show', wikiPage);
      }
      else {
        res.render('show', {title: 'UNKNOWN PAGE'});
      }
    }
  });

});

module.exports = router;