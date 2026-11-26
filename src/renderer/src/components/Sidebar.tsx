import { LayoutDashboard, Settings, ChartNoAxesCombined } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border border-slate-200 min-h-screen shadow-lg p-5 flex flex-col print:hidden">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
          <ChartNoAxesCombined size={24} className="text-white" />
        </div>

        <div>
          <h1 className="font-bold text-xl text-slate-800">FinSight</h1>
          <p className="text-xs text-slate-800">Financial Reporting</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-3">منوی اصلی</p>

      <nav className="space-y-2">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
          <LayoutDashboard size={19} />
          <span>داشبورد</span>
        </button>

        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition">
          <Settings size={19} />
          <span>تنظیمات</span>
        </button>
      </nav>

      <div className="mt-auto text-xs text-slate-500">FinSight Desktop v0.1.0</div>
    </aside>
  )
}
