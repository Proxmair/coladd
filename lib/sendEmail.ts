
import { Resend } from 'resend';
const resend = new Resend('re_ZPsdNmwf_MAW7o1aCSqPF4q3SFT9Byxi7');
export const sendEmail = async (emails: string[], subject: string, html:string) => {
    try {
        await resend.emails.send({
            from: 'COLADD <onboarding@resend.dev>',
            to: emails,
            subject: subject,
            html: html
        });
        return true;
    } catch (error) {
        console.log('Send Email Error', error);
        return false;
    }
}

export const sendVerificationEmail = async (email:string, otp:string) => {
    console.log(email,'email')
    await sendEmail([email],'Verfiy you email', `<p>Your email verification otp is this ${otp}</p>`)
}

interface ContactData {
  fullName: string;
  email: string;
  contactNumber: string;
  message: string;
}

export const sendContactInformationEmail = async (
  email: string,
  data: ContactData
) => {
  const html = `
    <div style="font-family:sans-serif;">
      <h2>New Contact Submission</h2>

      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.contactNumber}</p>

      <hr />

      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    </div>
  `;

  return await sendEmail([email], 'New Contact Message', html);
};