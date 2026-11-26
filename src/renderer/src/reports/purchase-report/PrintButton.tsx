import { useState } from 'react';
import Alert from '../../components/alert'

interface PrintButtonProps {
  disabled?: boolean
}

export function PrintButton({ disabled = false }: PrintButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePrint = async () => {
    try {
      setLoading(true)
      setError('')

      const result = await window.finsight.printReport()

      if (!result.success) {
        setError(result.reason ?? 'چاپ گزارش انجام نشد')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در چاپ گزارش')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="print:hidden">
      <button
        type="button"
        onClick={handlePrint}
        disabled={disabled || loading}
        className="
        inline-flex items-center gap-2
        rounded-xl bg-emerald-600 px-4 py-2.5
        text-sm font-medium text-white
        transition-colors hover:bg-emerald-700
        disabled:cursor-not-allowed disabled:opacity-50
      "
      >
        <span className="text-lg">⎙</span>
        {loading ? 'در حال آماده‌سازی نسخه چاپی...' : 'پیش‌نمایش و چاپ'}
      </button>
      {error && <Alert severity="error" message={error} className="mt-3" />}
    </div>
  )
}
