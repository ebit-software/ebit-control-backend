exports.sendProform = (to,subject,text) => {
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
    
    //paquetes

    let basicPdf = path.join(__dirname,'../../public/packages/paquete_basico/paquete_basico.pdf');
    let basicImg = path.join(__dirname,'../../public/packages/paquete_basico/paquete_basico.png');

    let businessPdf = path.join(__dirname,'../../public/packages/paquete_negocios/paquete_negocios.pdf');
    let businessImg = path.join(__dirname,'../../public/packages/paquete_negocios/paquete_negocios.png');

    let enterprisePdf = path.join(__dirname,'../../public/packages/paquete_empresarial/paquete_empresarial.pdf');
    let enterpriseImg = path.join(__dirname,'../../public/packages/paquete_empresarial/paquete_empresarial.png');

    let html =  `<img src="cid:img"/><br><p>${text}</p>`;
  
    let mailOptions = {
      from: 'ventas@ebit-software.com',
      to: to, 
      subject: subject,
      text: text, // plain text body
      html: html,
      attachments: [
        { filename: 'Plan de Negocios.png', path: businessImg, cid: 'img'},
        { filename: 'Plan de Negocios.pdf', path:businessPdf ,contentType: 'application/pdf'}
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
