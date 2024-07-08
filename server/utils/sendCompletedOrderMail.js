import nodemailer from "nodemailer"

export const sentCompletedOrderMail = (orderData) => {

    if (orderData.details.customer_data.email.length <= 0) return

    const transporter = nodemailer.createTransport({
        host: "neptun.kreativmedia.ch",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "info@smart-pos.ch",
            pass: "t9*1kW69s"
        }
    });

    const mailOptions = {
        from: `Bestellung <info@bistro-aladin.ch>`,
        to: orderData.details.customer_data.email,
        subject: `Order #${orderData.id} is ready`,
        html: `
        <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center" valign="middle" style="background-color: #fcfafa; padding: 12px; border-radius: 12px;">
                    <table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #ddd; font-family: Arial, sans-serif;">
                        <tr>
                            <td style="padding: 3px;">
                                <img style="max-width: 200px; height: auto;" src="https://resto-demo.ch/wp-content/uploads/2023/03/image.png" alt="store logo" />
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 3px;">
                                <p style="font-size: 16px; font-weight: bold;">Your order is ready.</p>
                                <p style="font-size: 16px;"><span style="font-weight: bold;">Bestellung:</span> #${orderData.id}</p>
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
