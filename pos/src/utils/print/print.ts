export const printHtml = (windowRef, html) => {

    // USE THE COMMENTED WHEN --KIOSK-PRINTING IN CHROME
    // const printWindow = windowRef.current.open(undefined, undefined, "width=50, height=50")
    const printWindow = windowRef.open("")

    if (printWindow && html) {
        printWindow.document.write(html)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
    } else {
        console.error("Ocurrió un error al intentar imprimir la ventana")
    }
}