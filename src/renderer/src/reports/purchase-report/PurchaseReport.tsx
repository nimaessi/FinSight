import type { PurchaseReport as PurchaseReportModel } from '../../../../shared/contracts/purchase-report.contract';

import { ReportHeader } from './ReportHeader'
import { ReportKpis } from './ReportKpis'
import { PurchaseBreakdown } from './PurchaseBreakdown'
import { SettlementBreakdown } from './SettlementBreakdown'
import { TaxBalance } from './TaxBalance'
import { InvoiceDetails } from './InvoiceDetails'
import { GasInvoices } from './GasInvoices'
import { PeriodDetails } from './PeriodDetails'

interface Props {
  data: PurchaseReportModel
  fileName: string
}

export function PurchaseReport({ data, fileName }: Props) {
  return (
    <div className="purchase-report space-y-7">
      <ReportHeader title={data.period.title} fileName={fileName} />

      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="grid grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-slate-400 mb-2">دوره</p>
            <p className="font-bold text-slate-800">{data.period.code}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-2">نرخ مالیات</p>
            <p className="font-bold text-slate-800">{data.period.taxRate}٪</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-2">شروع دوره</p>
            <p className="font-bold text-slate-800">{data.period.startDate}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-2">پایان دوره</p>
            <p className="font-bold text-slate-800">{data.period.endDate}</p>
          </div>
        </div>
      </section>

      <ReportKpis data={data} />

      <div className="grid grid-cols-2 gap-5">
        <PurchaseBreakdown data={data} />
        <SettlementBreakdown data={data} />
      </div>

      <TaxBalance data={data} />

      <InvoiceDetails data={data} />

      <GasInvoices data={data} />

      <PeriodDetails data={data} />

      <footer className="text-center text-xs text-slate-400 py-5 border-t border-slate-200">
        FinSight Desktop - Financial Reporting
      </footer>
    </div>
  )
}
