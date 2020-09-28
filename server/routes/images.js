const router = require('express').Router();

const FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor.js');


router.post('/upload_image', function (req, res) {
  console.log('image upload sucess!!')
  // Store image.
  FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {
    // Return data.
    var thishost = req.protocol + '://' + req.get('host');
    console.log("thishost = " + thishost);
    var fullurl = thishost + data.link;
    console.log("fullurl = " + fullurl);
    // update the original data.link that contained only
    // the URI to the complete URL that includes hostname
    data.link = fullurl;

    console.log("Modified data = " + JSON.stringify(data));
    if (err) {
      return res.send(JSON.stringify(err));
    }
    res.send(data);
  });
});

module.exports = router;
