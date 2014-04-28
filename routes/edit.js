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
        res.render('edit', wikiPage);
      }
      else {
        res.render('show', {title: 'UNKNOWN PAGE'});
      }
    }
  });
});


router.post('/submit', function(req, res) {
  var models = require('../models/');
  var title = req.body.pageTitle;
  var body = req.body.pageContent;
  var id = req.body.pageID;
  var url_name = title.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");

  console.log(title, id);

  models.Page.findByIdAndUpdate(id, { title: title, body: body, url_name: url_name }, function(err, wikiPage) {
      if (err) {
        console.log(err);
      }
      else {
        if(wikiPage) {
          //console.log("Wikipage found", wikiPage);
          res.redirect('/wiki/' + url_name);
        }
        else {
          res.render('show', {title: 'UNKNOWN PAGE'});
        }
      }
    });

  // var url_name = generateUrlName(title);

  // var p = new models.Page({ "title": title, "body":body, "url_name": url_name});
  // p.save();
  // res.redirect('/wiki/' + url_name);
});



module.exports = router;