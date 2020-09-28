const router = require('express').Router();

const FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor.js');


router.post('/upload_image', function (req, res) {
  console.log('image upload sucess!!')
  // Store image.
  FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {
    // Return data.
    var thishost = req.protocol + '://' + req.get('host');
    var fullurl = thishost + data.link;
    data.link = fullurl;

    console.log("Modified data = " + JSON.stringify(data));
    if (err) {
      return res.send(JSON.stringify(err));
    }
    res.send(data);
  });
});

module.exports = router;
