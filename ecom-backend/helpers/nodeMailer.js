import nodemailer from 'nodemailer';
import { generateOrderTemplate } from './orderTemplate.js';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mdayank7786@gmail.com",
        pass: "ekcnnsnkhupofcre"
    },
    secure: false,
});

export const sendMailToUser = async (to, customerName, orderNumber, products, total) => {
    console.log(customerName, orderNumber, products, total, "from nodemailer")
    const htmlContent = generateOrderTemplate({
        customerName,
        orderNumber,
        products,
        total,
    });

    const mailOptions = {
        from: "mdayank7786@gmail.com",
        to: to,
        subject: 'Order Confirmation',
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail sent:', info.response);
        return { status: true };
    } catch (error) {
        console.log('Error sending mail:', error.message);
        return { status: false };
    }
};
