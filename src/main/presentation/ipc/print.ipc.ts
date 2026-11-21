import { BrowserWindow, ipcMain } from 'electron';

export function registerPrintIPC() {
  ipcMain.handle('report:print', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)

    if (!window) {
      return {
        success: false,
        reason: 'Application window not found'
      }
    }

    return new Promise((resolve) => {
      window.webContents.print(
        {
          silent: false,
          printBackground: true,
          pageSize: 'A4'
        },
        (success, failureReason) => {
          resolve({
            success,
            reason: failureReason
          })
        }
      )
    })
  })
}
