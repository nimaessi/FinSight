import type { PurchaseReport } from './purchase-report.contract'

export interface ExcelImportResult {
  canceled: boolean
  fileName?: string
  report?: PurchaseReport
}
