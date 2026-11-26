import { FileSpreadsheet } from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8">
      <div>
        <h2 className="font-bold text-lg text-slate-800">داشبورد</h2>

        <p className="text-xs text-slate-400 mt-1">مدیریت و تهیه گزارش‌های مالی</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          <FileSpreadsheet className="text-emerald-600" />
        </div>

        <div className="text-sm">
          <p className="font-semibold text-slate-700">FinSight</p>

          <p className="text-xs text-slate-400">نسخه دسکتاپ</p>
        </div>
      </div>
    </header>
  )
}
