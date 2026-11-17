import { PurchaseReport } from '../../main/infrastructure/excel/PurchaseReportParser';

export interface ExcelImportResult {
  canceled: boolean
  fileName?: string
  report?: PurchaseReport
}
