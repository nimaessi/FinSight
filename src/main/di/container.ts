import { ImportExcelUseCase } from '../application/excel/ImportExcelUseCase';

import { SheetJsPurchaseReportReader } from '../infrastructure/excel/SheetJsPurchaseReportReader';

const purchaseReportReader = new SheetJsPurchaseReportReader();

export const container = {
  importExcel: new ImportExcelUseCase(purchaseReportReader)
}
