import type { PurchaseReport } from '../../../../shared/contracts/purchase-report.contract'

import { formatMoney, formatNumber, formatPercent } from './report.utils'

export function GasInvoices({ data }: { data: PurchaseReport }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">صورتحساب‌های گاز</h3>
      </div>

      <table className="w-full text-sm text-right">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-4">نرخ</th>
            <th className="p-4">تعداد</th>
            <th className="p-4">ناخالص</th>
            <th className="p-4">مالیات</th>
          </tr>
        </thead>

        <tbody>
          {data.gasInvoices.map((item) => (
            <tr key={item.rate} className="border-t border-slate-100">
              <td className="p-4">{formatPercent(item.rate)}</td>
              <td className="p-4">{formatNumber(item.count)}</td>
              <td className="p-4">{formatMoney(item.gross)}</td>
              <td className="p-4">{formatMoney(item.tax)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
