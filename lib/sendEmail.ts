
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