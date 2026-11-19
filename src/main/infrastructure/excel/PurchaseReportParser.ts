import * as XLSX from 'xlsx'

export interface PurchaseReport {
  period: {
    title: string
    code: string
    taxRate: number
    startDate: string
    endDate: string
    previousYear: string
    referencedPeriod: string
    referencedRecordCount: string
  }

  purchases: {
    taxBreakdown: {
      rate: number
      gross: number
      tax: number
    }[]
    total: {
      gross: number
      tax: number
    }
    settlements: {
      type: string
      gross: number
      tax: number
    }[]
  }

  taxBalance: {
    total: number
    currentPeriod: number
    previousPeriods: number
    future: number
  }

  summary: {
    items: {
      title: string
      amount: number
    }[]
  }

  referencedPeriods: {
    period: string
    lastUpdated: string
  }[]

  invoices: {
    unpaid: {
      title: string
      count: number
      gross: number
      tax: number
    }
    pendingPayments: {
      title: string
      count: number
      gross: number
      tax: number
    }[]
    historical: {
      title: string
      count: number | null
      gross: number | null
      tax: number
    }[]
  }

  gasInvoices: {
    rate: number
    count: number
    gross: number
    tax: number
  }[]
}

export class PurchaseReportParser {
  parse(workbook: XLSX.WorkBook): PurchaseReport {
    const sheet = workbook.Sheets['Sheet1']

    if (!sheet) {
      throw new Error('Sheet1 not found')
    }

    const get = (cell: string): unknown => sheet[cell]?.v ?? null

    const str = (cell: string): string => String(get(cell) ?? '')

    const num = (cell: string): number => Number(get(cell) ?? 0)


    const taxBreakdown = [
      { rate: 10, gross: num('F3'), tax: num('G3') },
      { rate: 0, gross: num('F6'), tax: num('G6') },
      { rate: 30, gross: num('F9'), tax: num('G9') },
      { rate: 15, gross: num('F10'), tax: num('G10') }
    ]

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

        pendingPayments: [23, 24, 25, 26].map((row) => ({
          title: str(`E${row}`),
          count: num(`F${row}`),
          gross: num(`G${row}`),
          tax: num(`H${row}`)
        })),

        historical: [29, 30, 31].map((row) => ({
          title: str(`E${row}`),
          count: get(`F${row}`) === null ? null : num(`F${row}`),
          gross: get(`G${row}`) === null ? null : num(`G${row}`),
          tax: num(`H${row}`)
        }))
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
