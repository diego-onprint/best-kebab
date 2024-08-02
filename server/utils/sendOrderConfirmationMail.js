import nodemailer from "nodemailer"
import { formatDate } from "./formatDate.js"
import { calculatePercentage } from "./calculatePercentage.js"

export const sendOrderConfirmationMail = (data) => {

    console.log("DATA.....", data)

    const transporter = nodemailer.createTransport({
        host: "neptun.kreativmedia.ch",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "info@smart-pos.ch",
            pass: "t9*1kW69s"
        }
    });

    const products = data.cart.products.map(product => {
        return `<li>${product.name} x ${product.qty} - ${product.price}</li>`;
    });

    const mailOptions = {
        from: `Bestellung <info@bistro-aladin.ch>`,
        to: data.details.customer_data.email,
        subject: `Order Confirmation #${data.id} - ${data.details.created_at}`,
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
                                <p style="font-size: 16px; font-weight: bold;">Thank you for your order.</p>
                                <p style="font-size: 16px;"><span style="font-weight: bold;">Bestellung:</span> #${data.id}</p>
                            </td>
                        </tr>
                        ${
                            data.details.table !== "null" ?
                            `<tr>
                                <td style="padding: 3px;">
                                    <p style="font-size: 16px;"><span style="font-weight: bold;">Tisch:</span> ${data.details.table}</p>
                                </td>
                            </tr>` : ``
                        }
                        <tr>
                            <td style="padding: 3px;">
                                <p style="font-size: 14px;"><span style="font-weight: bold;">Bestelldatum:</span> ${formatDate(data.details.created_at)}</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 3px;">
                                <p style="font-size: 14px; font-weight: bold;">${data.details.order_type.name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="font-size: 14px; font-weight: bold;">Kundendaten</p>
                                ${data.details.customer_data.name.length > 0 ? `<p style="font-size: 14px;">${data.details.customer_data.name}</p>` : ``}
                                ${data.details.customer_data.surname.length > 0 ? `<p style="font-size: 14px;">${data.details.customer_data.surname}</p>` : ``}
                                ${data.details.customer_data.phone.length > 0 ? `<p style="font-size: 14px;">${data.details.customer_data.phone}</p>` : ``}
                                ${data.details.customer_data.address.length > 0 ? `<p style="font-size: 14px;">${data.details.customer_data.address}</p>` : ``}
                                ${data.details.customer_data.city.length > 0 ? `<p style="font-size: 14px;">${data.details.customer_data.city}</p>` : ``}
                                ${data.details.customer_data.postcode.length > 0 ? `<p style="font-size: 14px;">${data.details.customer_data.postcode}</p>` : ``}
                                ${data.details.customer_data.notes.length > 0 ? `<p style="font-size: 14px;">Notes: ${data.details.customer_data.notes}</p>` : ``}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 3px;">
                                <p style="font-size: 16px;"><span style="font-weight: bold;">Zahlung:</span> ${data.details.payment_method.name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <table style="width: 100%; max-width: 400px; border-collapse: collapse; margin: 0 auto;">
                                    <thead>
                                        <tr>
                                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Qty</th>
                                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
                                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">CHF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.cart.products.map(product => {

                                            if (product.variations.length <= 0) {
                                                return `
                                                <tr>
                                                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${product.qty}</td>
                                                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${product.name}</td>
                                                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${product.price}</td>
                                                </tr>
                                                `
                                            }

                                            return `
                                                <tr>
                                                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${product.qty}</td>
                                                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${product.name}</td>
                                                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${product.price}</td>
                                                </tr>
                                                ${product.variations.map(variation => `
                                                    <tr>
                                                        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                                                        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${variation.option_name}</td>
                                                        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${variation.option_price}</td>
                                                    </tr>
                                                `).join('')}
                                            `

                                        }).join('')}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total</strong></td>
                                            <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">CHF ${data.cart.total.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 1px;">
                                <p style="font-size: 12px;">MwSt. CHF${calculatePercentage(data.cart.total, 2.6).toFixed(2)} -> 2.6% MwsT. inkl</p>
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
