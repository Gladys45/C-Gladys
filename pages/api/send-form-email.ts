import type { NextApiRequest, NextApiResponse } from "next";
import { fixedMailReceiver, transporter } from "@/lib/mailer";

type RequestBody = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  message?: string;
  interest?: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { fullName, email, phoneNumber, message, interest } =
      req.body as RequestBody;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required.",
      });
    }

    await transporter.sendMail({
      from: `"Cupital Group Website" <${process.env.SMTP_USER}>`,
      to: fixedMailReceiver,
      replyTo: email,
      subject: `New Website Form Submission from ${fullName}`,
      text: `
New form submission received

Full Name: ${fullName}
Email: ${email}
Phone Number: ${phoneNumber || "Not provided"}
Interest: ${interest || "Not provided"}
Message: ${message || "Not provided"}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Website Form Submission</h2>
          <p>A visitor submitted the website form.</p>

          <table style="border-collapse: collapse; width: 100%;" border="1" cellpadding="10">
            <tr>
              <td><strong>Full Name</strong></td>
              <td>${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td><strong>Phone Number</strong></td>
              <td>${escapeHtml(phoneNumber || "Not provided")}</td>
            </tr>
            <tr>
              <td><strong>Interest</strong></td>
              <td>${escapeHtml(interest || "Not provided")}</td>
            </tr>
            <tr>
              <td><strong>Message</strong></td>
              <td>${escapeHtml(message || "Not provided")}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email.",
    });
  }
}