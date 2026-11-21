import { ipcRenderer } from 'electron';

export const electronAPI = {
  selectExcel: () => ipcRenderer.invoke('excel:select'),
  printReport: () => ipcRenderer.invoke('report:print')
}
