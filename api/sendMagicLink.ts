
export async function sendMagicLink(email: string, token: string) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const magicUrl = `https://yourdomain.com/api/magic-login?token=${token}`;

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email }],
        subject: 'Your Magic Login Link',
      }],
      from: { email: process.env.SMTP_FROM || process.env.SMTP_USER },
      content: [{
        type: 'text/html',
        value: `<p>Click <a href="${magicUrl}">here</a> to log in to your ebook access.</p>`,
      }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }
}
