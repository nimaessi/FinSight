import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export function registerPrintIPC() {
  ipcMain.handle('report:print', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)

    if (!window) {
      return {
        success: false,
        reason: 'Application window not found'
      }
    }

    const pdf = await event.sender.printToPDF({
      printBackground: true,
      pageSize: 'A4',
      preferCSSPageSize: true
    })
    const filePath = join(app.getPath('temp'), `finsight-report-${randomUUID()}.pdf`)

    await writeFile(filePath, pdf)

    const openError = await shell.openPath(filePath)
    if (openError) {
      return {
        success: false,
        reason: `PDF saved to ${filePath}, but could not be opened: ${openError}`
      }
    }

    return { success: true }
  })
}
