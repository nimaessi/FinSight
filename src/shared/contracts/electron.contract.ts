import type { ExcelImportResult } from './excel-import.contract'

export interface ElectronAPI {
  selectExcel: () => Promise<ExcelImportResult>
}
