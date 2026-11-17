import type { ElectronAPI } from '../../shared/contracts/excel.contract';

declare global {
  interface Window {
    finsight: ElectronAPI
  }
}

export {}
