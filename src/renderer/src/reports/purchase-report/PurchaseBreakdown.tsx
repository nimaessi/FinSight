import type { PurchaseReport } from '../../../../shared/contracts/purchase-report.contract'

import { formatMoney, formatPercent } from './report.utils'

export function PurchaseBreakdown({ data }: { data: PurchaseReport }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">تفکیک خرید بر اساس نرخ مالیات</h3>

        <p className="text-xs text-slate-400 mt-2">بررسی مبلغ ناخالص و مالیات خرید کالا و خدمات</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">نرخ مالیات</th>
              <th className="p-4">مبلغ ناخالص</th>
              <th className="p-4">مبلغ مالیات</th>
            </tr>
          </thead>

          <tbody>
            {data.purchases.taxBreakdown.map((item) => (
              <tr key={item.rate} className="border-t border-slate-100">
                <td className="p-4 font-semibold text-slate-700">{formatPercent(item.rate)}</td>

                <td className="p-4 text-slate-600">{formatMoney(item.gross)}</td>

                <td className="p-4 text-slate-600">{formatMoney(item.tax)}</td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-emerald-50 font-bold">
            <tr>
              <td className="p-4">مجموع</td>
              <td className="p-4">{formatMoney(data.purchases.total.gross)}</td>
              <td className="p-4">{formatMoney(data.purchases.total.tax)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}
