var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stubankemail@gmail.com',
        pass: 'StubankPassword'
    }
});

var mailOptions = {
    from: 'stubankemail@gmail.com',
    to: 'maisieeddleston@hotmail.co.uk',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});