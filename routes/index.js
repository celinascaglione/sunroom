var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

console.log(req.body)

 var nombreyapellido = req.body.nopmbreyapellido;
 var email = req.body.email;
 var celular = req.body.celular;
 var ciudad = req.body.ciudad;
 var comentario = req.body.comentario;
 
 var obj = {
  to: 'celinascaglione@hotmail.com',
  subject: 'Contacto desde la web',
  html: nombreyapellido + " se contactó a través de la web y quiere más información : " + email + ". <br> Además hizo este comentario : " + comentario + ". Su celular es: " + celular + ". <br> Es de la ciudad de: " + ciudad + "."
}

var transport = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS

}
})
var info = await transport.sendMail(obj);

res.render('index', {
  message: 'Mensaje enviado'
})

})


module.exports = router;

