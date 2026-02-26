import { z } from 'zod';
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().optional().nullable(),
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const input = contactSchema.parse(req.body);

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    if (!host || !user || !pass || !from) {
      return res.status(500).json({ message: "SMTP is not configured." });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Blueprint Site" <${from}>`,
      to: "admin@mathrix.co.uk",
      replyTo: input.email,
      subject: `New 1-on-1 Coaching Request from ${input.name}`,
      html: `
        <h2>New 1-on-1 Coaching Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${input.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${input.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${input.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${input.message || "Not provided"}</td></tr>
        </table>
      `,
    });

    res.status(200).json({ success: true, message: "Request received. We'll be in touch soon." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
