import { SheetJsPurchaseReportReader } from '../../infrastructure/excel/SheetJsPurchaseReportReader';

export class ImportExcelUseCase {
  constructor(private readonly reader: SheetJsPurchaseReportReader) {}

  async execute(filePath: string) {
    return this.reader.read(filePath);
  }
}
