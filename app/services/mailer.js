exports.sendProform = (to,subject,text,package) => {
  return new Promise((resolve,reject) => {

    const nodemailer = require("nodemailer");
    const path = require('path');
  
    let transporter = nodemailer.createTransport({
      pool:true,
      host: "186.3.211.15",
      port: 26,
      secure: false,
      auth: {
        user: 'ventas@ebit-software.com',
        pass: 'HPESOJ04091996'
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    if(package == 'basic'){
      var pdf = path.join(__dirname,'../../public/packages/paquete_basico/paquete_basico.pdf');
      var img = path.join(__dirname,'../../public/packages/paquete_basico/paquete_basico.png');
    }else if(package == 'business'){
      var pdf = path.join(__dirname,'../../public/packages/paquete_negocios/paquete_negocios.pdf');
      var img = path.join(__dirname,'../../public/packages/paquete_negocios/paquete_negocios.png');
    }else if(package == 'enterprise'){
      var pdf = path.join(__dirname,'../../public/packages/paquete_empresarial/paquete_empresarial.pdf');
      var img = path.join(__dirname,'../../public/packages/paquete_empresarial/paquete_empresarial.png');
    };


    let html = 
    `<style type="text/css">
        img{
          width: 30em;
        }
      </style>
      <p>${text}</p>
      <br/>
      <img src="cid:paquete"/>
      <br/>
      <p>Atentamente, </br></br> <b>Ebit Software</b> </p>`;
  
    let mailOptions = {
      from: 'ventas@ebit-software.com',
      to: to, 
      subject: subject,
      html: html,
      attachments: [
        { filename: 'Paquete.png', path: img, cid: 'paquete'},
        { filename: 'Proforma.pdf', path: pdf, contentType: 'application/pdf'}
      ]
    };
  
    transporter.sendMail(mailOptions,(error,response) => {
        if(error) reject(false);
        if(response) resolve(true);
    });
  })
}


// Reciba un cordial saludo de nuestra empresa, pongo a disposición el servicio para el manejo del correo corporativo para la facturación electrónica en su empresa,
// donde usted podrá enviar sus correos electrónicos de forma segura y fácil con el nombre empresarial mejorando notablemente la imagen de su negocio. 
