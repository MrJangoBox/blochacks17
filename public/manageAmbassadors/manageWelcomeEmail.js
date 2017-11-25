var nodemailer = require('nodemailer');
var fs = require("fs");

module.exports.sendWelcome = function (newUser, next) {
    var welcomeEmail = '';
    var emailLink = '';
    
    if(newUser.form_language == 'En') {
        emailLink = './public/emailTemplates/welcomeEmailEn.html';
        emailTitle = 'Welcome to Prëmo'
    } else {
        emailLink = './public/emailTemplates/welcomeEmailFr.html';
        emailTitle = 'Bienvenu chez Prëmo'
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
                to: newUser.email,
                from: '',
                subject: emailTitle,
                // text: 'Hi, here is your user email : ' + newUser.email + '. Have a nice day Martin!'
                html: welcomeEmail
            };
            smtpTransport.sendMail(mailOptions, function(error) {
                if(error){
                    console.log(error);
                }else{    
                    console.log('An e-mail has been sent to ' + newUser.email + ' with further instructions.')
                }
            });
        }
    });

    return next();
};
