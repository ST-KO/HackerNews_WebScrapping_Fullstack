import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(filePath, recipientEmail) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Read the file
  const fileData = await fs.readFile(filePath);

  // Determine content type based on file extension
  const contentType = filePath.endsWith(".csv")
    ? "text/csv"
    : "application/json";

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"Si Thu Ko" <${process.env.EMAIL_USER}>`, // sender address
    to: recipientEmail, // insert the recipients' emails
    // to: "qa-hiring@qawolf.com", // insert the recipients' emails
    subject: "Hacker News Articles by Si Thu Ko", // Subject line
    html: "<b>Please find the attached data file containing the Hacker News articles</b>", // html body
    attachments: [
      {
        filename: filePath.split("/").pop(),
        content: fileData,
        contentType: contentType,
      },
    ],
  });
}
