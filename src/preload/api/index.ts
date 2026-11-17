import { ipcRenderer } from 'electron'

export const electronAPI = {
  selectExcel: () => {
    return ipcRenderer.invoke('excel:select')
  }
}
