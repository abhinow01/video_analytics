import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express()
const port = 3000
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'laisha72@ethereal.email',
        pass: '6f5zzvGaPYx19KdjkF'
    }
});

app.post('/send-email', async (req,res)=>{
try{
    const {name,email} = req.body;
    const info = await transporter.sendMail({
        from: email,
        to: 'ravi@anchors.in', // The email address you want to send the email to
        subject: 'Callback Request',
        text: `Name: ${name}\nEmail: ${email}`,
    })

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


}catch(error){
    console.error(error);
    res.status(500).send('Error sending email');
}
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })