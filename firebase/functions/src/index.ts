// Instalaciones -->cd functions macbook$ npm install express cors , npm install @types/express --save-dev , npm install @types/cors --save-dev, npm install cors nodemailer , npm i -D dotenv
// En Package.json  "build": "tsc --skipLibCheck",
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
const nodemailer = require('nodemailer');

if(process.env.NODE_ENV != "production"){ require("dotenv").config();}


const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://trupiggybank-default-rtdb.firebaseio.com"
});

// *** 2 *** // Referencia a la base de datos
//const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//



 // Express
const app = express();
app.use(cors({ origin: true}));


interface Formulario{

    nombre: string ;
    correo: string ;

    }

app.post( '/mail' , async( req , res   ) => { 
  
const body = req.body ;
  
try { const form: Formulario = {
                                    nombre: body.nombre,
                                    correo: body.email, }
                                    console.log(form);
  async function main(){

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: "ipablorg@gmail.com",
  pass: "shvytsojnjclxcem",}});

  // send mail with defined transport object
  const info = await transporter.sendMail({
  from: "ipablorg@gmail.com", // sender address
  to: body.email, // list of receivers
  subject: 'TRU : PiggyBank', // Subject line
  cc: "ipablorg@gmail.com",
  text: 'Hi. I hope this email finds you well. You just filled a form with the email:'+' '+ body.email + ' '+ 'and your name is:'+' '+body.nombre,
  });
      
  return info;
  }
  main().catch(console.error);   
  res.status(200).json({ 
  petitcionOK:true,
  mensaje:'Correo enviado con exito',
  });
  }              
              
                              catch(error) {
                              res.status(400).json({ petitcionOK:false,
                              mensaje:'error al enviar correo',
                              errores:error });
                              }
  })



export const api = functions.https.onRequest(app);
