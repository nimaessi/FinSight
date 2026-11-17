import { ExcelImportResult } from '../../../shared/contracts/excel.contract';

interface Props {
  data: ExcelImportResult
}

export function ExcelPreview({ data }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800">پیش‌نمایش اطلاعات</h3>

          <p className="text-xs text-slate-400 mt-1">
            {data.fileName} / {data.sheetName}
          </p>
        </div>

        <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg">
          {data.totalRows} ردیف اطلاعات
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-slate-50">
            <tr>
              {data.columns.map((column, index) => (
                <th key={index} className="p-4 text-slate-600 font-semibold whitespace-nowrap">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100 hover:bg-slate-50">
                {data.columns.map((_, colIndex) => (
                  <td key={colIndex} className="p-4 text-slate-600 whitespace-nowrap">
                    {String(row[colIndex] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.totalRows > data.rows.length && (
        <div className="p-4 text-center text-xs text-slate-400 border-t">
          نمایش {data.rows.length} ردیف از {data.totalRows} ردیف
        </div>
      )}
    </div>
  )
}
