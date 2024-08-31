import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <jonasbaluklopfer@gmail.com>',
      to: ['Jonasklopferbalu@gmail.com'],
      subject: 'Hello world',
      react: <><p>Email Body</p></>
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
