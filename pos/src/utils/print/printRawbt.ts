import * as htmlToImage from 'html-to-image'

export const printRawbt = async () => {
    const html = document.getElementById("shop-ticket")
    const dataUrl = await htmlToImage.toPng(html) /* Try toJpg or other method */
    const S = "#Intent;scheme=rawbt;"
    const P = "package=ru.a402d.rawbtprinter;end;"
    window.location.href = "intent:" + dataUrl + S + P
    // console.log(dataUrl)
}