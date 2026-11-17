import { FileUp, FileSpreadsheet } from 'lucide-react'

interface Props {
  onSelect: () => void
  loading: boolean
}

export function ExcelUploader({ onSelect, loading }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-7">
      <div className="mb-6">
        <h3 className="font-bold text-slate-800 text-lg">ایجاد گزارش جدید</h3>

        <p className="text-sm text-slate-400 mt-2">
          برای شروع، فایل Excel اطلاعات خرید یا فروش خود را وارد کنید.
        </p>
      </div>

      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
          <FileSpreadsheet size={32} className="text-emerald-600" />
        </div>

        <h4 className="font-semibold text-slate-700">فایل Excel خود را انتخاب کنید</h4>

        <p className="text-xs text-slate-400 mt-2 mb-6">فرمت‌های پشتیبانی‌شده XLS و XLSX</p>

        <button
          onClick={onSelect}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold transition"
        >
          <FileUp size={18} />

          {loading ? 'در حال پردازش...' : 'انتخاب فایل Excel'}
        </button>
      </div>
    </div>
  )
}
