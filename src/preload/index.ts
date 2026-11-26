import { contextBridge } from 'electron';
import { electronAPI } from './api';

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('finsight', electronAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
