var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('add_page', {title: 'ADD PAGE'});
});

router.post('/submit', function(req, res) {
  var models = require('../models/');

  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here
  var title = req.body.pageTitle;
  var body = req.body.pageContent;

  var generateUrlName = function(name) {
    if (typeof name != "undefined" && name !== "") {
      // Removes all non-alphanumeric characters from name
      // And make spaces underscore
      return name.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
    } else {
      // Generates random 5 letter string
      return Math.random().toString(36).substring(2,7);
    }
  };
  console.log(title);

  var url_name = generateUrlName(title);

  var p = new models.Page({ "title": title, "body":body, "url_name": url_name});
  p.save();
  res.redirect('/wiki/' + url_name);
  //res.render('show', wikiPage);
});

module.exports = router;