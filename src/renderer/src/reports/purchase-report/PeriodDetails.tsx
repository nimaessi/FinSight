import type { PurchaseReport } from '@/shared/contracts/purchase-report.contract'

export function PeriodDetails({ data }: { data: PurchaseReport }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">دوره‌های ارجاعی</h3>

        <p className="text-xs text-slate-400 mt-2">آخرین تاریخ به‌روزرسانی اطلاعات هر دوره</p>
      </div>

      <table className="w-full text-sm text-right">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-4">دوره</th>
            <th className="p-4">آخرین به‌روزرسانی</th>
          </tr>
        </thead>

        <tbody>
          {data.referencedPeriods.map((item) => (
            <tr key={item.period} className="border-t border-slate-100">
              <td className="p-4 font-semibold text-slate-700">{item.period}</td>

              <td className="p-4 text-slate-500">{item.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
