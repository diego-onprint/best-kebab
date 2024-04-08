export const createLocalTicketHtml = (data) => {

    console.log(data)

    const items = data.line_items.map(item => {
        return `
            <div class="item">
                <div style="width: 25px;">${item.quantity}</div>
                <div style="flex: 1;">${item.name}</div>
                <div><span class="chf">CHF. </span>${item.price}</div>
            </div>
            `
    }).join('')

    const ticket = `
        <div>
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
                <div>Bestellung: #${data.id}</div>
                <div>Bestelldatum: ${data.date_created}</div>
                <div>Table: ${data.billing.first_name}</div>
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
                <div style="font-size: 14px;">MwSt. CHF. ${"revisar"} -> 8.1% MwsT. inkl</div>
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
                    margin-bottom: 5px;
                    column-gap: 5px;
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