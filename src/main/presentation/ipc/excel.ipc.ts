import { ipcMain, dialog } from 'electron'
import { container } from '../../di/container'

export function registerExcelIPC() {
  ipcMain.handle('excel:select', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: 'Excel Files',
          extensions: ['xlsx', 'xls']
        }
      ]
    })

    if (result.canceled || !result.filePaths[0]) {
      return { canceled: true }
    }

    const report = await container.importExcel.execute(result.filePaths[0])

    return {
      canceled: false,
      fileName: result.filePaths[0].split(/[\\/]/).pop(),
      report
    }
  })
}
