import * as htmlToImage from 'html-to-image'

export const printTicket = async (html) => {
    const dataUrl = await htmlToImage.toPng(html)
    const S = "#Intent;scheme=rawbt;"
    const P = "package=ru.a402d.rawbtprinter;end;"
    window.location.href = "intent:" + dataUrl + S + P
}