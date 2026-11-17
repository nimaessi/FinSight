import { useState } from 'react'
import { FileSpreadsheet } from 'lucide-react'

import type { PurchaseReport } from '../../../shared/contracts/purchase-report.contract';

import { ExcelUploader } from '../components/ExcelUploader'

import { PurchaseReport as PurchaseReportView } from '../reports/purchase-report/PurchaseReport'

export function Dashboard() {
  const [report, setReport] = useState<PurchaseReport | null>(null)

  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSelectExcel = async () => {
    try {
      setLoading(true)
      setError('')

      const result = await window.finsight.selectExcel();

      if (result.canceled) return

      if (!result.report) {
        throw new Error('گزارش از فایل استخراج نشد')
      }

      setReport(result.report)
      setFileName(result.fileName ?? 'Excel')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در پردازش فایل')
    } finally {
      setLoading(false)
    }
  }

  if (report) {
    return (
      <div className="p-8">
        <button
          onClick={() => setReport(null)}
          className="mb-6 text-sm text-emerald-600 hover:text-emerald-700"
        >
          ← بازگشت به انتخاب فایل
        </button>

        <PurchaseReportView data={report} fileName={fileName} />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">ایجاد گزارش مالی</h2>

        <p className="text-sm text-slate-400 mt-2">
          فایل Excel خود را انتخاب کنید تا گزارش آن ساخته شود.
        </p>
      </div>

      <ExcelUploader onSelect={handleSelectExcel} loading={loading} />

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">{error}</div>}

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <FileSpreadsheet size={16} />
        فرمت‌های پشتیبانی‌شده: XLSX و XLS
      </div>
    </div>
  )
}
