import nodemailer, { TransportOptions } from "nodemailer";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";

enum EmailType {
  RESET = "RESET",
  VERIFY = "VERIFY",
}
export async function sendEmail({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === EmailType.VERIFY) {
      const c = await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
      console.log(c);
    } else if (emailType === EmailType.RESET) {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    } as TransportOptions);

    const mailOptions = {
      from: "ns0109375@gmail.com",
      to: email,
      subject:
        emailType === EmailType.VERIFY
          ? "Verify Your Email"
          : "Reset Your Password",
      html: `
          <p>
            Click the link below to ${
              emailType === EmailType.VERIFY
                ? "verify your email"
                : "reset your password"
            }:
          </p>
          <a href="${process.env.DOMAIN}/${
        emailType === EmailType.VERIFY ? "verify-email" : "reset-password"
      }?token=${hashedToken}">
            Click here
          </a>
          <br />
          <p>This link will expire in 1 hour.</p>
        `,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown Error");
  }
}
