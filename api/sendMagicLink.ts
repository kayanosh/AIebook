import nodemailer from "nodemailer";

function getBaseUrl() {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:5000";
}

export async function sendMagicLink(email: string, token: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass || !from) {
    throw new Error("SMTP env vars are missing");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const magicUrl = `${getBaseUrl()}/api/magic-login?token=${token}`;
  await transporter.sendMail({
    from,
    to: email,
    subject: "Your Magic Login Link",
    html: `<p>Click <a href="${magicUrl}">here</a> to log in to your ebook access.</p>`,
  });
}
