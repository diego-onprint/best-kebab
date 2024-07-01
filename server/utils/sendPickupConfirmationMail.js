import nodemailer from "nodemailer"

export const sendPickUpConfirmationMail = (id, email) => {

    const transporter = nodemailer.createTransport({
        host: "neptun.kreativmedia.ch",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "cus-orders@smart-pos.ch",
            pass: "Diego2024@"
        }
    });

    const mailOptions = {
        from: `Bestellung #${id} <SmartPos>`,
        to: email,
        subject: `Your order #${id} is ready`,
        html: `
        <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center" valign="middle" style="background-color: #fcfafa; padding: 12px; border-radius: 12px;">
                    <table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #ddd; font-family: Arial, sans-serif;">
                        <tr>
                            <td style="padding: 3px;">
                                <p style="font-size: 16px;"><span style="font-weight: bold;">Bestellung:</span> #${id}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return { error: true, msg: "Error sending email" };
        } else {
            console.log('Email sent: ' + info.response);
            return { success: true, data: info.response };
        }
    });
};
