import { useState } from 'react';

import type { PurchaseReport } from '../../../shared/contracts/purchase-report.contract';

import { ExcelUploader } from '../components/ExcelUploader';

import { PurchaseReport as PurchaseReportView } from '../reports/purchase-report/PurchaseReport';
import Alert from '../components/alert';

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

      setReport(result?.report as unknown as PurchaseReport);
      setFileName(result.fileName ?? 'Excel');
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
          className="mb-6 text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer">
          ← بازگشت به انتخاب فایل
        </button>
        <PurchaseReportView data={report} fileName={fileName} />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-7">
      {error && <Alert severity="error" message= {error} />}
      <ExcelUploader onSelect={handleSelectExcel} loading={loading} />
    </div>
  )
}
