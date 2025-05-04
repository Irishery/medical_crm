export function printer<T extends any>(data: T, callback: (data: T) => string) {
    const printContent = callback(data)
    const printWindow = window.open('', '_blank')
    printWindow?.document.write(`
      <html>
        <head>
          <title>Печать данных</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `)
    printWindow?.document.close()
    printWindow?.print()
}
