import nodemailer from "nodemailer";
import { z } from "zod";

const payloadSchema = z.object({
  email: z.string().email(),
  amountInPence: z.number().int().positive(),
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, amountInPence } = payloadSchema.parse(req.body);
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

    const amount = `£${(amountInPence / 100).toFixed(2)}`;
    await transporter.sendMail({
      from: `"AutonomousLab by Mathrix" <${from}>`,
      to: email,
      subject: "Payment confirmed — AutonomousLab (charged by Mathrix)",
      html: `
        <h2>Payment Confirmed</h2>
        <p>Thanks for your purchase from <strong>AutonomousLab</strong>.</p>
        <p><strong>Amount paid:</strong> ${amount}</p>
        <p>
          Important: your bank statement may show the charge as
          <strong> Mathrix</strong>.
        </p>
        <p>
          This is expected: <strong>AutonomousLab</strong> is operated by
          <strong> Mathrix</strong>.
        </p>
        <p>If you need help, reply to this email or contact admin@mathrix.co.uk.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
