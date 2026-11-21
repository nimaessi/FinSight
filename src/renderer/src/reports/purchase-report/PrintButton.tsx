import { useState } from 'react';

interface PrintButtonProps {
  disabled?: boolean
}

export function PrintButton({ disabled = false }: PrintButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePrint = async () => {
    try {
      setLoading(true)

      const result = await window.finsight.printReport()

      if (!result.success) {
        console.error('Print failed:', result.reason)
      }
    } catch (error) {
      console.error('Print error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
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
        print:hidden
      "
    >
      <span className="text-lg">⎙</span>
      {loading ? 'در حال چاپ...' : 'چاپ گزارش'}
    </button>
  )
}
