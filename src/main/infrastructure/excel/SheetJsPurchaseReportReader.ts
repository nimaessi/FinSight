import * as XLSX from 'xlsx';
import { PurchaseReportParser } from './PurchaseReportParser';
import { PurchaseReport } from '../../../shared/contracts/purchase-report.contract';

export class SheetJsPurchaseReportReader {
  private parser = new PurchaseReportParser()

  async read(filePath: string): Promise<PurchaseReport> {
    const workbook = XLSX.readFile(filePath, {
      cellDates: true
    })

    return this.parser.parse(workbook)
  }
}
