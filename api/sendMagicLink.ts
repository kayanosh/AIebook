import nodemailer from 'nodemailer';

export async function sendMagicLink(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const magicUrl = `https://yourdomain.com/api/magic-login?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Your Magic Login Link',
    html: `<p>Click <a href="${magicUrl}">here</a> to log in to your ebook access.</p>`,
  });
}
