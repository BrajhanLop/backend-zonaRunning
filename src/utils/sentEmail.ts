import nodemailer from 'nodemailer';

interface EmailOptions{
    to:string;
    subject:string;
    html:string;

}

const sendEmail = (options:EmailOptions): Promise<any> => new Promise((resolve, reject)=>{

 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"davidmercado7082@gmail.com",
        pass:"uvacbybnyflhtvfl"
    },
    secure:false
 });

 const mailOptions = {
    from:"davidmercado7082@gmail.com",
    ...options
 }  

 transporter.sendMail(mailOptions, (error, info) => {
        console.log(error, info);
        if(error){
            console.log(error);
            return reject({message:"An error has occured"})
            
        }
        return resolve({message:"Email sent successfully"})
 })

})

export default sendEmail;