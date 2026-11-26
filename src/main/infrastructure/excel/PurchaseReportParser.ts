import * as XLSX from 'xlsx'
import type { PurchaseReport } from '../../../shared/contracts/purchase-report.contract'

export class PurchaseReportParser {
  parse(workbook: XLSX.WorkBook): PurchaseReport {
    const sheet = workbook.Sheets['Sheet1']

    if (!sheet) {
      throw new Error('Sheet1 not found')
    }

    const get = (cell: string): unknown => sheet[cell]?.v ?? null

    const str = (cell: string): string => String(get(cell) ?? '')

    const num = (cell: string): number => {
      const value = get(cell)
      if (value === null || value === '') return 0

      const parsed = Number(value)
      if (!Number.isFinite(parsed)) {
        throw new Error(`Invalid numeric value in cell ${cell}`)
      }

      return parsed
    }

    const taxBreakdown = [
      { rate: 10, gross: num('F3'), tax: num('G3') },
      { rate: 0, gross: num('F6'), tax: num('G6') },
      { rate: 30, gross: num('F9'), tax: num('G9') },
      { rate: 15, gross: num('F10'), tax: num('G10') }
    ]

    const historicalRows = [29, 30, 31]
    const sumHistoricalValues = (column: string): number =>
      historicalRows.reduce(
        (total, row) => total + num(`${column}${row}`) * (row === 31 ? -1 : 1),
        0
      )

    return {
      period: {
        title: str('B2'),
        code: str('C3'),
        taxRate: num('C4'),
        startDate: str('C5'),
        endDate: str('C6'),
        previousYear: str('C7'),
        referencedPeriod: str('C9'),
        referencedRecordCount: str('C10')
      },

      purchases: {
        taxBreakdown,
        total: {
          gross: num('F11'),
          tax: num('G11')
        },
        settlements: [
          {
            type: str('H3'),
            gross: num('I3'),
            tax: num('J3')
          },
          {
            type: str('H4'),
            gross: num('I4'),
            tax: num('J4')
          },
          {
            type: str('H5'),
            gross: num('I5'),
            tax: num('J5')
          }
        ]
      },

      taxBalance: {
        total: num('H14'),
        currentPeriod: num('H15'),
        previousPeriods: num('H16'),
        future: num('H17')
      },

      summary: {
        items: [
          { title: str('L3'), amount: num('M3') },
          { title: str('L4'), amount: num('M4') },
          { title: str('L5'), amount: num('M5') }
        ]
      },

      referencedPeriods: Array.from({ length: 12 }, (_, index) => {
        const row = 20 + index

        return {
          period: str(`B${row}`),
          lastUpdated: str(`C${row}`)
        }
      }).filter((item) => item.period),

      invoices: {
        unpaid: {
          title: str('E20'),
          count: num('F20'),
          gross: num('G20'),
          tax: num('H20')
        },

        pending: {
          count: num('F23'),
          gross: num('G23'),
          tax: num('H23')
        },

        historical: {
          count: sumHistoricalValues('F'),
          gross: sumHistoricalValues('G'),
          tax: sumHistoricalValues('H')
        }
      },

      gasInvoices: [35, 36].map((row) => ({
        rate: Number(str(`E${row}`).match(/\d+/)?.[0] ?? 0),
        count: num(`F${row}`),
        gross: num(`G${row}`),
        tax: num(`H${row}`)
      }))
    }
  }
}
