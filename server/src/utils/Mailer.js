import nodemailer from 'nodemailer';
import passwordReset from '../templates/passwordReset';
import passwordResetSuccess from '../templates/passwordResetSuccess';

const url = process.env.BASE_URL;

/**
 * Mailer Emmiter
 * @class Mailer
 */
class Mailer {
    /**
     * Sends Mail
     * @method sendMail
     * @param { string } to
     * @param { string } subject
     * @param { string } message
     * @memberof Mailer
     * @returns {void}
     */
    static sendMail({ to, subject, message }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'malikberrish@gmail.co',
                pass: 'boondocks44',
            },
        });

        const mailOptions = {
            from: '"Politico" <malikberrish@gmail.com>',
            to,
            cc: 'malikberrish@gmail.com',
            subject,
            html: message,
        };

        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email was successfully sent.');
            }
        });
    }

    /**
      * Sends Mail for user to use to reset his password
      * @method forgotPasswordMail
      * @memberof Mailer
      * @param {string} token
      * @param {string} emailAddress
      * @returns {void}
      */
    static forgotPasswordMail(token, email) {
        const message = passwordReset(url, token, email);

        return Mailer.sendMail({
            to: email,
            subject: 'Politico: Reset Password',
            message,
        });
    }

    /**
   * Sends Mail after user succesfully reset his password
   * @method resetPasswordMail
   * @memberof Mailer
   * @param {string} emailAddress
   * @returns {void}
   */
    static resetPasswordMail(emailAddress) {
        const message = passwordResetSuccess(url);

        return Mailer.sendMail({
            to: emailAddress,
            subject: 'Politico: Password Reset Successful',
            message
        });
    }
}

export default Mailer;
