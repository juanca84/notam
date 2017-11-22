var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
PythonShell.defaultOptions = {
    scriptPath: './python'
};

const translate = require('node-deepl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trad-NOTAM' });
});

router.post('/traducir', function(req, res, next) {
  const trad = req.body.code;
  translate(trad, "EN", "ES", (err, response) => {
    if(err) {
        console.log(err);
        return;
    }
    PythonShell.run('echo_args.py', function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });
    console.log('Result: ', response);
    res.render('index', { title: 'Trad-NOTAM', code: trad, proc: true, trad: response });
  });
});

module.exports = router;
