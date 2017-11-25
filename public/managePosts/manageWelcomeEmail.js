var nodemailer = require('nodemailer');
var fs = require("fs");

module.exports.sendWelcome = function (newPost, next) {
    var welcomeEmail = '';
    var emailLink = '';
    
    if(newPost.form_language == 'En') {
        emailLink = './public/emailTemplates/postEmailEn.html';
        emailTitle = 'Thanks for sharing your Need with Prëmo'
    } else {
        emailLink = './public/emailTemplates/postEmailFr.html';
        emailTitle = 'Merci de partager votre besoin avec Prëmo'
    }
    
    fs.readFile(emailLink, function (err, html) {
        if (err) {
            // handle error
            console.log(' ' + err);
        } else {
            //Assigning coresponding email template
            welcomeEmail = html;
            
            var smtpTransport = nodemailer.createTransport('SMTP', {
                host: 'smtp.office365.com',
                port: '587',
                auth: {
                    user: '',
                    pass: ''
                },
                secureConnection: false,
                tls: { ciphers: 'SSLv3' }
            });

            var mailOptions = {
                to: newPost.email,
                from: '',
                subject: emailTitle,
                // text: 'Hi, here is your user email : ' + newPost.email + '. Have a nice day Martin!'
                html: welcomeEmail
            };
            smtpTransport.sendMail(mailOptions, function(error) {
                if(error){
                    console.log(error);
                }else{    
                    console.log('An e-mail has been sent to ' + newPost.email + ' with further instructions.')
                }
            });
        }
    });

    return next();
};