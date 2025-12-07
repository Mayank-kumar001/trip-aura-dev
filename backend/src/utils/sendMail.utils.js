import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
const sendMail = async (data) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: `${data}`, // plain‑text body
    html: `<b>${data}</b>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export default sendMail
