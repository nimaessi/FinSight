import type { ElectronAPI } from '../../shared/contracts/electron.contract'

declare global {
  interface Window {
    finsight: ElectronAPI
  }
}

export {}
