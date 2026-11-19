export interface ExcelReaderPort {
  read(filePath: string): Promise<{
    fileName: string
    sheetName: string
    columns: string[]
    rows: unknown[][]
    totalRows: number
  }>
}
