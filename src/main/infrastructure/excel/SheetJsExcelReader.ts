import path from 'node:path'
import * as XLSX from 'xlsx'

import type { ExcelReaderPort } from '../../application/excel/ImportExcelUseCase'

export class SheetJsExcelReader implements ExcelReaderPort {
  async read(filePath: string) {
    const workbook = XLSX.readFile(filePath, {
      cellDates: true
    })

    const sheetName = workbook.SheetNames[0]

    if (!sheetName) {
      throw new Error('Excel file has no worksheets')
    }

    const sheet = workbook.Sheets[sheetName]

    const data = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      defval: '',
      raw: true
    })

    const headers = data[0] ?? []

    const columns = headers.map((item, index) => String(item || `Column ${index + 1}`))

    const rows = data.slice(1, 31)

    return {
      fileName: path.basename(filePath),
      sheetName,
      columns,
      rows,
      totalRows: Math.max(data.length - 1, 0)
    }
  }
}
