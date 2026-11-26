import type { PurchaseReport } from '@/shared/contracts/purchase-report.contract'

import { formatMoney } from './report.utils'

export function TaxBalance({ data }: { data: PurchaseReport }) {
  const items = [
    { title: 'مانده کل', value: data.taxBalance.total },
    { title: 'طی دوره', value: data.taxBalance.currentPeriod },
    { title: 'سنواتی', value: data.taxBalance.previousPeriods },
    { title: 'آتی', value: data.taxBalance.future }
  ]

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="font-bold text-slate-800 mb-6">وضعیت مانده مالیات</h3>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`rounded-xl p-4 ${index === 0 ? 'bg-emerald-50' : 'bg-slate-50'}`}
          >
            <p className="text-xs text-slate-500 mb-3">{item.title}</p>

            <p className="text-lg font-bold text-slate-800">{formatMoney(item.value)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
