import type { PurchaseReport } from '../../../../shared/contracts/purchase-report.contract';

import { formatMoney } from './report.utils'

export function SettlementBreakdown({ data }: { data: PurchaseReport }) {
  const total = data.purchases.settlements.reduce((sum, item) => sum + item.gross, 0)

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="font-bold text-slate-800 mb-6">تفکیک نوع تسویه</h3>

      <div className="space-y-5">
        {data.purchases.settlements.map((item) => {
          const percent = total > 0 ? (item.gross / total) * 100 : 0

          return (
            <div key={item.type}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">{item.type}</span>

                <span className="text-sm font-semibold text-slate-800">
                  {formatMoney(item.gross)}
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
