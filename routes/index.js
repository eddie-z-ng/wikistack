var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var models = require('../models/');

  models.Page.find({}, function(err, allPages) {
    if (err) {
      console.log(err);
    }
    else {
      if(allPages) {
        console.log("allPages found", allPages);

        res.render('index', {title: "BROWSE MY WIKISTACK", docs: allPages});
      }
      else {
        // res.render('show', {title: 'UNKNOWN PAGE'});
      }
    }
  });

  // res.render('index', { title: 'BROWSE MY WIKISTACK' });
});

module.exports = router;