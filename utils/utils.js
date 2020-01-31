const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

const nodemailer = require('nodemailer')

class Utils{

    encrypt(text){
        let cipher = crypto.createCipher(algorithm,password)
        let crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    }
    
    decrypt(text){
        let decipher = crypto.createDecipher(algorithm,password)
        let dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    } 

    generateHash(){
        return crypto
            .createHash('sha256')
            .update(`${ Math.random(10000000) }`)
            .update('salt').digest('hex')
    }

    isCpf(c){
        if((c = c.replace(/[^\d]/g,"")).length != 11) return false;
        if (c == "00000000000") return false;
        let r;
        let s = 0;   
        for (let i=1; i<=9; i++) s = s + parseInt(c[i-1]) * (11 - i); 
        r = (s * 10) % 11;
        if ((r == 10) || (r == 11)) r = 0;
        if (r != parseInt(c[9])) return false;
        s = 0;
        for (let i = 1; i <= 10; i++) s = s + parseInt(c[i-1]) * (12 - i); 
        r = (s * 10) % 11;
        if ((r == 10) || (r == 11)) r = 0;
        if (r != parseInt(c[10])) return false;
        return true;
    }

    isEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    sendEmail(email, subject, body){ 
        return new Promise((resolve, reject)=>{
            if(email && email.length > 0 && this.isEmail(email)){

               let transporter = 
                nodemailer.createTransport({
                  service: process.env.SMTP_SERVICE,
                  // host: process.env.SMTP_SERVICE,
                  // port: 465,
                  // secure: true,
                  auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD
                  }
                });
              
                transporter.sendMail({
                  from: process.env.SMTP_SENDER,
                  to: email,
                  subject: subject,
                  html: body
                }, (error, info) => {
                  console.log({error})
                  console.log({info})
                    if (error) {
                      reject(error);
                    } else {
                      resolve(info);
                    }
                });
    
            }else{
                resolve(true);
            }  
        }) 
    }

    emailMarketingTemplate(title, message){
      var fs = require('fs'),
      path = require('path'),    
      filePath = path.join(__dirname, '../templates/emails/1.html');
  
      return new Promise((resolve, reject) => {
         fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                // console.log('received data: ' + data);
                let _html = data.replace(/\##SERVER_URL##/g, process.env.PUBLIC_URL )
                _html = _html.replace(/\##TITLE##/g, title)
                _html = _html.replace(/\##DESCRIPTION##/g, message)
                resolve(_html) 
            } else { console.log(err);  }
        }); 
      })
     
    }


}

module.exports = Utils; 