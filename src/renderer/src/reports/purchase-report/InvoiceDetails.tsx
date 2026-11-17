import type { PurchaseReport } from '../../../../shared/contracts/purchase-report.contract';

import { formatMoney, formatNumber } from './report.utils';



export function InvoiceDetails({ data }: { data: PurchaseReport }) {
  const sections = [
    {
      title: 'صورتحساب‌های فاقد اعلامیه پرداخت',
      rows: [
        {
          title: 'صورتحساب‌های فاقد اعلامیه پرداخت',
          ...data.invoices.unpaid
        }
      ]
    },
    {
      title: 'اعلامیه پرداخت‌های در انتظار واکنش',
      rows: [
        {
          title: 'اعلامیه پرداخت‌های در انتظار واکنش',
          ...data.invoices.pending
        }
      ]
    },
    {
      title: 'اطلاعات صورتحساب‌های ارجاعی و سنواتی',
      rows: [
        {
          title: 'صورتحساب‌های ارجاعی و سنواتی',
          ...data.invoices.historical
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section
          key={section.title}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
        >
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">{section.title}</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">شرح</th>
                  <th className="p-4">تعداد</th>
                  <th className="p-4">ناخالص</th>
                  <th className="p-4">مالیات</th>
                </tr>
              </thead>

              <tbody>
                {section.rows.map((item, index) => (
                  <tr key={index} className="border-t border-slate-100">
                    <td className="p-4 text-slate-700 min-w-64">{item.title}</td>

                    <td className="p-4 text-slate-600">{formatNumber(item.count)}</td>

                    <td className="p-4 text-slate-600">{formatMoney(item.gross)}</td>

                    <td className="p-4 text-slate-600">{formatMoney(item.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
