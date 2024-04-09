import { formatPrice } from "./formatPrice"

export const createPrintOnlyTicketHtml = (data, tax, currentClient: string) => {

    const items = data.products.map(product => {

        const variations = product.variations.length > 0 ? product.variations.map(variation => {
            return `
                <div class="item">
                    <div style="width: 25px;"></div>
                    <div class="variation">${variation.name}</div>
                    <div class="chf">CHF. ${formatPrice((variation.price).toString())}</div>
                </div>
            `
        }).join('') : ``

        const notes = product.notes.length > 0 ? `
                <div class="notes">
                    <div class="variation">Notes:</div>
                    <div class="variation">${product.notes}</div>
                </div>
        ` : ``

        return `
            <div class="item">
                <div style="width: 25px;">${product.qty}</div>
                <div style="flex: 1;">
                    ${product.name}
                </div>
                <div><span class="chf">CHF. </span>${formatPrice((product.price * product.qty).toString())}</div>
            </div>
            ${variations}
            ${notes}
            `
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
            <hr class="separator" />
            <div class="order-details">
                <div>Table: ${currentClient}</div>
            </div>
            <hr class="separator" />
            <div class="items-list">
                <div class="table-header">
                    <div style="width: 25px;">Qty</div>
                    <div style="flex: 1;">Artikel</div>
                    <div>Preis</div>
                </div>
                ${items}
            </div>
            <hr class="separator" />
            <div class="item">
                <div>Rabatt</div>
                <div><span class="chf">CHF. </span>0</div>
            </div>
            <div class="item">
                <div>Versandgebühr</div>
                <div><span class="chf">CHF. </span>0</div>
            </div>
            <div class="item">
                <div>Zahlung</div>
                <div>Kasse</div>
            </div>
            <div class="item" style="margin-top: 5px;">
                <div style="font-size: 14px;">MwSt. CHF. ${tax.total} -> ${tax.rate}% MwsT. inkl</div>
            </div>
            <div class="item">
                <div class="emph">Gesamt</div>
                <div class="emph">CHF. ${data.total}</div>
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

                .table-header {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 5px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid black;
                }

                .items-list {
                    list-style-type: none;
                    display: flex;
                    flex-direction: column;
                }

                .qty {
                    width: 30px;
                }

                .item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    column-gap: 5px;
                }

                .notes {
                    margin-left: 30px;
                    margin-bottom: 15px;
                }

                .variation {
                    flex: 1;
                    font-size: 12px;
                }

                .emph {
                    font-weight: bold;
                    font-size: 22px;
                }

                .chf {
                    font-size: 12px;
                }

                .separator {
                    width: 100%;
                    height: 1px;
                    background-color: black;
                    margin-top: 15px;
                    margin-bottom: 15px;
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