import { ShoppingCart, Receipt, Wallet } from 'lucide-react'
import type { PurchaseReport } from '../../../../shared/contracts/purchase-report.contract'

import { formatMoney } from './report.utils'

interface Props {
  data: PurchaseReport
}

export function ReportKpis({ data }: Props) {
  const items = [
    {
      title: 'مجموع خرید ناخالص',
      value: data.purchases.total.gross,
      icon: ShoppingCart,
      color: 'emerald'
    },
    {
      title: 'مالیات خرید',
      value: data.purchases.total.tax,
      icon: Receipt,
      color: 'blue'
    },
    {
      title: 'مانده کل مالیات',
      value: data.taxBalance.total,
      icon: Wallet,
      color: 'violet'
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-5">
      {items.map((item) => {
        const Icon = item.icon

        const colors = {
          emerald: 'bg-emerald-50 text-emerald-600',
          blue: 'bg-blue-50 text-blue-600',
          violet: 'bg-violet-50 text-violet-600'
        }

        return (
          <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-slate-500">{item.title}</p>

              <div className={`p-3 rounded-xl ${colors[item.color]}`}>
                <Icon size={21} />
              </div>
            </div>

            <p className="text-2xl font-bold text-slate-800 tabular-nums">
              {formatMoney(item.value)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
