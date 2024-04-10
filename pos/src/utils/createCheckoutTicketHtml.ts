import { formatPrice } from "./formatPrice"

export const createCheckoutTicketHtml = (data, tax, currentClient: string, paymentMethod: string) => {

    const items = data.products.map(product => {

        if (product.variations.length > 0) {

            const variations = product.variations.length > 0 ? product.variations.map(variation => {
                return `
                <tr>
                    <td class="text-sm">${variation.name}</td>
                    <td class="text-sm">${formatPrice((variation.price).toString())}</td>
                </tr>
            `
            }).join('') : ``

            return `
                <tr>
                    <td rowspan=${product.variations.length + 1}>${product.qty}</td>
                    <td class="text-md" style="flex: 1;">
                        ${product.name}
                    </td>
                    <td class="text-md" style="width: 55px;">${formatPrice((product.price * product.qty).toString())}</td>
                </tr>
                ${variations}
            `

        } else {

            return `
                <tr>
                    <td>${product.qty}</td>
                    <td class="text-md">
                        ${product.name}
                    </td>
                    <td class="text-md" style="width: 55px;">${formatPrice((product.price * product.qty).toString())}</td>
                </tr>
            `
        }

    }).join('')

    const ticket = `
        <div style="max-width: 350px; margin: 0 auto;">
            <div class="logo-container">
                <img class="logo" src="/assets/lovely-logo.jpg" alt="" />
            </div>
            <div>
                <div>Seuzachstrasse 2,</div>
                <div>8413 Neftenbach</div>
                <div>www.lovely-burger.ch</div>
                <div>MWST CHE-166.937.519</div>
            </div>
            <div style="margin: 10px 0;">
                <p>${currentClient}</p>
                <p>Zahlung: ${paymentMethod}</p>
            </div>
            <table>
                <tr>
                    <th class="th qty text-sm align-left">Q</th>
                    <th class="th art text-sm align-left">Artikel</th>
                    <th class="text-sm align-left">CHF</th>
                </tr>
                ${items}
                <tr>
                    <td rowspan="3"></td>
                    <td>Rabatt</td>
                    <td class="text-md"></span>0</td>
                </tr>
                <tr>
                    <td>Versandgebühr</td>
                    <td class="text-md"></span>0</td>
                </tr>
                <tr>
                    <td class="emph">Gesamt</td>
                    <td class="emph">${data.total}</td>
                </tr>
            </table>
            <div class="text-md" style="margin-top: 10px; text-align: right;">
                <div style="font-size: 14px;">MwSt. CHF. ${tax.total} -> ${tax.rate}% MwsT. inkl</div>
            </div>
        </div>
    `

    const html = `
        <html>
            <head>
                <title>Print Receipt</title>
                <style>

                * {
                    margin: 0;
                    padding: 0;
                }

                body {
                    padding: 10px;
                }

                .logo-container {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo {
                    width: 120px;
                    height: 120px;
                    object-fit: contain;
                }

                table, td, th {
                    border: 1px solid black;
                }

                td, th {
                    padding: 5px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .th {
                    font-size: 14px;
                }

                .qty {
                    width: 10px;
                }

                .art {
                    flex: 1;
                }

                .item {
                   display: flex; 
                }

                .text-sm {
                    font-size: 12px;
                }

                .text-md {
                    font-size: 14px;
                }

                .align-left {
                    text-align: left;
                }

                .emph {
                    font-weight: bold;
                    font-size: 16px;
                }

                </style>
            </head>
            <body>
            ${ticket}
            </body>
        </html>
        `

    return html
}