var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {

  novedades = await novedadesModel.getNovedades();
  novedades = novedades.slice(0, 5);
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/noimage.jpg'
      }
    }
  });
  res.render('index', {
    novedades
  });
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
  });

});


module.exports = router;

