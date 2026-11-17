import { PurchaseReport } from './purchase-report.contract'

export interface ExcelImportResult {
  canceled: boolean
  fileName?: string
  sheetName?: string
  columns: string[]
  rows: unknown[][]
  totalRows: number
}
export interface ExcelImportResult {
  canceled: boolean
  fileName?: string
  report?: PurchaseReport
}
export interface ElectronAPI {
  selectExcel: () => Promise<ExcelImportResult>
}
