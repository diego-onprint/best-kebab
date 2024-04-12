export const printHtml = (elementId: string, html) => {
    document.getElementById(elementId).innerHTML = html
    window.print()
}