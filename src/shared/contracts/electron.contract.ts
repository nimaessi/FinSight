import type { ExcelImportResult } from './excel-import.contract'

export interface PrintResult {
  success: boolean
  reason?: string
}

export interface ElectronAPI {
  selectExcel: () => Promise<ExcelImportResult>
  printReport: () => Promise<PrintResult>
}
