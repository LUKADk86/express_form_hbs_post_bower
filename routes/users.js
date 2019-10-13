var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// l'url est /users/info et non /info parceque a app /users pour ce fichier

router.get('/infoid/:id', (req,res,next)=>{
  res.render('infoid', {id: req.params.id});
});
const { check, validationResult } = require('express-validator');
router.post('/info', (req,res,next)=>{
  req.check('nom', 'champs nom est vide').notEmpty();
  const errors=req.validationErrors();
  if(errors){
    console.log(errors);
    req.session.success=false;
    req.session.error=errors;
    res.redirect('/');
  }
  else{
    req.session.success=true;
    req.session.error=null;
  res.redirect('infoid/'+req.body.nom);
  }
});
module.exports = router;
